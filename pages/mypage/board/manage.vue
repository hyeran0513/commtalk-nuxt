<template>
  <section class="full-width">
    <section class="full-width">
      <div class="section-title">게시판 목록 관리</div>

      <div class="section-content">
        <base-tui-grid
          :data="board"
          :columns="gridProps.columns"
          :options="gridProps.options"
          :theme="gridProps.myTheme"
          :rowHeaders="gridProps.rowHeaders"
          :columnOptions="gridProps.columnOptions"
          v-if="board?.length > 0"
        />

        <template v-else>
          <BaseNodata text="게시판 목록이 없습니다." />
        </template>
      </div>
    </section>
  </section>
</template>

<script setup>
import {useLocalStorage} from "@vueuse/core";

const token = useLocalStorage('token', '');

const { data: board, refresh: refreshBoard } = await useAsyncData('board',
    () => $fetch(`/api/v1/boards`)
);

// 커스텀 렌더링
class deleteRenderer {
  constructor(props) {
    const el = document.createElement('button');
    const { fn } = props.columnInfo.renderer.options;
    const rowObject = props.grid.getRow(props.rowKey);

    el.innerHTML = props.columnInfo.header;
    el.className = 'tui-grid-btn btn-s-line-red';

    el.addEventListener('click', (ev) => {
      fn(rowObject.boardId);
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

// 게시판 삭제
const deleteBoard = async (boardId) => {
  try {
    const response = await fetch(`/api/v1/boards/${boardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      await refreshBoard();
      console.log("성공");
    } else {
      console.error("Error: ", response.status, response.statusText);
      const errorData = await response.json();
      console.error("Error details: ", errorData);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const gridProps = {
  columnOptions: {
    resizable: true,
    frozenCount: 1,
  },
  scrollY: false,
  scrollX: false,
  columns: [
    {
      header: '게시판 아이디',
      name: 'boardId',
      align: 'center',
      hidden: true
    },
    {
      header: '게시판',
      name: 'boardName',
      align: 'center'
    },
    {
      header: '삭제',
      name: 'reject',
      align: 'center',
      renderer: {
        type: deleteRenderer,
        options: {
          fn: deleteBoard
        }
      }
    },
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