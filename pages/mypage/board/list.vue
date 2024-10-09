<template>
  <section class="full-width">
    <section class="full-width">
      <div class="section-title">게시판 요청 목록</div>

      <div class="section-content">
        <div class="section-content-inner">
          <base-tui-grid
              :data="gridData"
              :columns="gridProps.columns"
              :options="gridProps.options"
              :theme="gridProps.myTheme"
              :rowHeaders="gridProps.rowHeaders"
              :columnOptions="gridProps.columnOptions"
              v-if="board?.boardReqs?.length > 0"
          />

          <template v-else>
            <BaseNodata text="게시판 요청 목록이 없습니다." />
          </template>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import {useLocalStorage} from "@vueuse/core";
import { useUserInfoStore } from '@/stores/userInfo';

const token = useLocalStorage('token', '');
const userInfoStore = useUserInfoStore();
const gridData = ref([]);

const pageableParams = ref({
  page: 0
});

// 게시판 생성 요청 목록 조회
const {data: board, refresh: refreshBoard, execute: executeBoard} = await useAsyncData('board',
    () => $fetch(`/api/v1/boards/requests`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      params: {
        page: JSON.stringify(pageableParams.value.page)
      }
    })
);

// 데이터 변환 로직
const transformGridData = (boardReqs) => {
  return boardReqs.map((req) => ({
    requestId: req.boardReqId,
    boardName: req.boardName,
    description: req.description,
    requesterNickname: req.requester.nickname,
    status: req.reqSts,
    cancelStatus: req.canceledYN === true ? 'Y' : 'N'
  }));
}

// gridData 설정
const setGridData = (boardReqs) => {
  gridData.value = transformGridData(boardReqs);
}

// 컴포넌트가 마운트될 때 데이터를 설정
onMounted(async () => {
  await refreshBoard();

  if (board.value && board.value.boardReqs) {
    setGridData(board.value.boardReqs);
  }
});

// grid 데이터 변경 시 데이터 재설정
watch(board, (newBoard) => {
  if (newBoard && newBoard.boardReqs) {
    setGridData(newBoard.boardReqs);
  }
});

// API 요청 처리 함수
const handleRequest = async (action, boardReqId) => {
  const response = await fetch(`/api/v1/boards/requests/${boardReqId}/${action}`, {
    method: (action === 'cancel') ? 'POST' : 'PATCH',
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details: ", errorData);
  } else {
    console.log("성공");
    await refreshBoard();
  }
};

const getButtonClass = (rowObject, name) => {
  if (rowObject.status !== '대기') return '';

  return name === 'reject' ? 'tui-grid-btn btn-s-line-red' :
      name === 'approve' ? 'tui-grid-btn btn-s-line-main' :
          name === 'cancel' && rowObject.cancelStatus === 'N' ? 'tui-grid-btn btn-s-line-gray' : '';
}

// 커스텀 렌더링
class activeRenderer {
  constructor(props) {
    const rowObject = props.grid.getRow(props.rowKey);
    const { fn } = props.columnInfo.renderer.options;
    const el = document.createElement('button');

    el.innerHTML = rowObject.status === '대기' ? props.columnInfo.header : '-';
    el.className = getButtonClass(rowObject, props.columnInfo.name);

    if (el.innerHTML !== '-') {
      el.addEventListener('click', () => fn(props.columnInfo.name, rowObject.requestId));
    }

    if (props.columnInfo.name === 'cancel' && rowObject.cancelStatus !== 'N') {
      el.innerHTML = '-';
    }

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.el.value = String(props.value);
  }
}

class statusRenderer {
  constructor(props) {
    const el = document.createElement('label');
    const rowObject = props.grid.getRow(props.rowKey);

    el.innerHTML = rowObject.status;

    if (rowObject.status === '거절') {
      el.className ='state-label-red';
    }

    if (rowObject.status === '승인') {
      el.className ='state-label-blue';
    }

    if (rowObject.status === '대기') {
      el.className ='state-label-green';
    }

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.el.value = String(props.value);
  }
}

// gridProps 설정
const gridProps = {
  columnOptions: {
    resizable: true,
    frozenCount: 1,
  },
  scrollY: false,
  scrollX: false,
  columns: [
    {
      header: '요청 아이디',
      name: 'requestId',
      align: 'center',
      hidden: true
    },
    {
      header: '게시판',
      name: 'boardName',
      align: 'center'
    },
    {
      header: '설명',
      name: 'description'
    },
    {
      header: '요청자',
      name: 'requesterNickname'
    },
    {
      header: '상태',
      name: 'status',
      align: 'center',
      renderer: {
        type: statusRenderer
      }
    },
    {
      header: '취소 상태',
      name: 'cancelStatus',
      align: 'center'
    },
    {
      header: '거절',
      name: 'reject',
      align: 'center',
      renderer: {
        type: activeRenderer,
        options: {
          fn: handleRequest
        }
      },
      hidden: !userInfoStore.admin
    },
    {
      header: '승인',
      name: 'approve',
      align: 'center',
      renderer: {
        type: activeRenderer,
        options: {
          fn: handleRequest
        }
      },
      hidden: !userInfoStore.admin
    },
    {
      header: '취소',
      name: 'cancel',
      align: 'center',
      renderer: {
        type: activeRenderer,
        options: {
          fn: handleRequest
        }
      },
      hidden: userInfoStore.admin
    }
  ],
  myTheme: {
    name: 'striped',
    value: {
      cell: {
        normal: {
          background: '#fff',
        },
        header: {
          background: '#f4f6fa'
        },
        evenRow: {
          background: '#fff'
        }
      },
    },
  },
  options: {
    rowHeaders: ['rowNum'],
  },
};

definePageMeta({
  layout: 'mypage',
});
</script>

<style>
@import 'https://uicdn.toast.com/tui-grid/latest/tui-grid.css';
</style>