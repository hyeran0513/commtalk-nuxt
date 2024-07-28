<template>
  <div class="detail">
    <div class="detail-inner">
      <div class="grid-top">
        <div class="title">
          <div class="txt">{{ boardName?.boardName }}</div>
          <div class="count"><span class="point-color">{{ boards?.posts.length }}</span>건</div>
        </div>

        <div class="search small">
          <div class="search-inner">
            <input type="text" placeholder="검색어를 입력해 주세요." />

            <button type="button" title="검색">
              <i class="icon-search"></i>
            </button>
          </div>
        </div>
      </div>

      <List :data="boards?.posts" :boardId="route.params.id" />

      <div class="pagination">
        <button type="button"
                class="btn-prev"
                v-if="boards?.pageNumber > 0"
                @click="loadPage(boards?.pageNumber - 1)">
          <i class="icon-chevron-left" />
        </button>

        <button type="button" class="page" v-for="page in boards?.totalPages"
             :key="page - 1"
             :class="{ 'is-active': page - 1 === boards?.pageNumber }"
             @click="loadPage(page - 1)">
          {{ page }}
        </button>

        <button type="button"
                class="btn-next"
                v-if="boards?.pageNumber + 1 < boards?.totalPages"
                @click="loadPage(boards?.pageNumber + 1)">
          <i class="icon-chevron-right" />
        </button>
      </div>

      <div class="btn-wrap">
        <NuxtLink :to="{ path: '/write', query: { boardId: $route.params.id }}" class="btn-s-fill-main">글 쓰기</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();

// 게시판 이름 호출
const { data: boardName, execute:exeBoardName } = await useAsyncData('boardName',
  () => $fetch(`/api/v1/boards/${route.params.id}`)
);

const pageableParams = ref({
  page: 0
});

// 게시판 목록 호출
const { data: boards, refresh: refreshBoards, execute: executeBoards } = await useAsyncData('boards',
  () => $fetch(`/api/v1/boards/${route.params.id}/posts`, {
    params: {
      boardId: route.params.id,
      page: JSON.stringify(pageableParams.value.page)
    }
  })
);

// 게시판 목록 로드
const loadPage = async (num) => {
  pageableParams.value.page = num;

  await refreshBoards();
};

onMounted(async () => {
  await executeBoards();
  await exeBoardName();
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/detail/board.scss');
</style>