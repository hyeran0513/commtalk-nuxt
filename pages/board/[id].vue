<template>
  <div class="detail">
    <div class="detail-inner">
      <div class="grid-top">
        <div class="title">
          <div class="txt">{{ boardName.boardName }}</div>
          <div class="count"><span class="point-color">{{ boards?.posts.length }}</span>건</div>
        </div>

        <div class="search small">
          <div class="search-inner">
            <input type="text" placeholder="검색어를 입력해 주세요." />

            <button type="button" title="검색">
              <i class="icon-search" />
            </button>
          </div>
        </div>
      </div>

      <List :data="boards?.posts" />

      <div class="btn-wrap">
        <NuxtLink to="/write" class="btn-s-fill-main">글 쓰기</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute();
  // 게시판 이름 호출
  const { data: boardName } = await useAsyncData('boardName',
      () => $fetch(`/api/v1/boards/${route.params.id}`)
  );

  const pageableParams = {
    page: 0
  };

  // 게시판 목록 호출
  const { data: boards } = await useAsyncData('boards',
    () => $fetch(`/api/v1/boards/${route.params.id}/posts`, {
      params: {
        boardId: route.params.id,
        pageable: JSON.stringify(pageableParams)
      }
    })
  );

  // const data = reactive([
  //   {
  //     POST_ID: '1',
  //     TITLE: '자유게시판01',
  //     CONTENT: '자유게시판 내용',
  //     COUNT: {
  //       COMMENT: '10',
  //       VIEW: '10',
  //       LIKE: '10'
  //     },
  //     USER_INFO: {
  //       USER_PROFILE: '',
  //       USER_NAME: '홍길동'
  //     },
  //     CREATE_DATE: '2024.06.19',
  //     MODIFY_DATE: '2024.06.19'
  //   },
  //   {
  //     POST_ID: '2',
  //     TITLE: '자유게시판02',
  //     CONTENT: '자유게시판 내용',
  //     COUNT: {
  //       COMMENT: '10',
  //       VIEW: '10',
  //       LIKE: '10'
  //     },
  //     USER_INFO: {
  //       USER_PROFILE: '',
  //       USER_NAME: '홍길동'
  //     },
  //     CREATE_DATE: '2024.06.19',
  //     MODIFY_DATE: '2024.06.19'
  //   }
  // ])
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/detail/board.scss');
</style>