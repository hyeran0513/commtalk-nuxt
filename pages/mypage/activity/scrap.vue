<template>
  <section class="full-width">
    <div class="section-title">스크랩</div>

    <div class="section-content">
      <div class="section-content-inner">
        <base-tui-grid
            :data="gridData"
            :columns="gridProps.columns"
            :options="gridProps.options"
            :theme="gridProps.myTheme"
            :rowHeaders="gridProps.rowHeaders"
            :columnOptions="gridProps.columnOptions"
            v-if="scraps?.posts?.length > 0"
        />

        <template v-else>
          <BaseNodata text="스크랩 항목이 없습니다." />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import { useLocalStorage } from '@vueuse/core';

const token = useLocalStorage('token', '');
const router = useRouter();

const pageableParams = ref({
  page: 0
});

// 회원 스크랩 게시글 목록 조회
const { data: scraps, refresh: refreshScraps, execute: executeScraps } = await useAsyncData('scraps',
    () => $fetch(`/api/v1/posts/me/scrapped`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      params: {
        page: JSON.stringify(pageableParams.value.page)
      }
    })
);

const gridData = ref();

// 데이터 변환 로직
const transformGridData = (scrapsPosts) => {
  return scrapsPosts.map((req) => ({
    postId: req.postId,
    boardId: req.board.boardId,
    boardName: req.board.boardName,
    title: req.title,
    previewContent: req.previewContent,
    authorName: req.authorName,
    updatedAt: req.updatedAt,
    viewCnt: req.viewCnt,
    commentCnt: req.commentCnt,
    likeCnt: req.likeCnt
  }));
}

// gridData 설정
const setGridData = (scrapsPosts) => {
  gridData.value = transformGridData(scrapsPosts);
}

// 컴포넌트가 마운트될 때 데이터를 설정
onMounted(async () => {
  await refreshScraps();

  if (scraps.value.posts) {
    setGridData(scraps.value.posts);
  }
});

// grid 데이터 변경 시 데이터 재설정
watch(scraps, (newValue) => {
  if (newValue && newValue.posts) {
    setGridData(newValue.posts);
  }
});

// 커스텀 렌더링
class titleRenderer {
  constructor(props) {
    const el = document.createElement('button');
    const { fn } = props.columnInfo.renderer.options;
    const rowObject = props.grid.getRow(props.rowKey);

    el.innerHTML = rowObject.title;

    el.addEventListener('click', (ev) => {
      fn(rowObject);
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

const handleTitle = (rowObject) => {
  router.push(`/post/${rowObject.postId}?boardId=${rowObject.boardId}`);
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
      header: '게시글 고유값',
      name: 'postId',
      align: 'center',
      hidden: true
    },
    {
      header: '게시판 고유값',
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
      header: '제목',
      name: 'title',
      align: 'center',
      className: 'has-bg',
      renderer: {
        type: titleRenderer,
        options: {
          fn: handleTitle
        }
      }
    },
    {
      header: '내용',
      name: 'previewContent',
      align: 'center'
    },
    {
      header: '작성자',
      name: 'authorName',
      align: 'center'
    },
    {
      header: '날짜',
      name: 'updatedAt',
      align: 'center'
    },
    {
      header: '조회수',
      name: 'viewCnt',
      align: 'center'
    },
    {
      header: '댓글수',
      name: 'commentCnt',
      align: 'center'
    },
    {
      header: '공감수',
      name: 'likeCnt',
      align: 'center'
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
  layout: 'mypage'
})
</script>