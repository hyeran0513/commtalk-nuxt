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
          />
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
    cancelStatus: req.canceledYN === true ? '취소' : '-'
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
    method: 'PATCH',
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

// 커스텀 렌더링
class activeRenderer {
  constructor(props) {
    const el = document.createElement('button');
    const { fn } = props.columnInfo.renderer.options;
    const rowObject = props.grid.getRow(props.rowKey);

    el.innerHTML = props.columnInfo.header;
    el.className = 'btn-s-fill-main';

    el.addEventListener('click', (ev) => {
      fn(props.columnInfo.name, rowObject.requestId);
    });

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
      align: 'center'
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
      hidden: !userInfoStore.admin
    }
  ],
  myTheme: {
    name: 'myTheme',
    value: {
      cell: {
        normal: {
          background: '#fff',
        },
        header: {
          background: '#f4f6fa'
        },
        editable: {
          background: '#fbfbfb',
        },
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