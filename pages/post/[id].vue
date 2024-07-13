<template>
  <div class="post">
    <div class="post-inner">
      <div class="title">{{ boardData?.title }}</div>
      <div class="content">{{ boardData?.content }}</div>
      <div class="user-info">
        <div class="profile">
          <div class="profile-img" v-if="boardData?.PROFILE"></div>
          <div class="profile-default" v-else></div>
        </div>

        <div class="user-name">{{ boardData?.author?.nickname }}</div>
        <div class="date">{{ boardData?.updatedAt }}</div>
      </div>


      <div class="btn-wrap">
        <div class="btn-group">
          <button type="button" class="btn-comment" @click="showComment = !showComment">
            <span class="txt">댓글 {{ boardData?.commentCnt }}</span>

            <template v-if="boardData?.commentableYN">
              <i class="icon-chevron-down" v-if="showComment" />
              <i class="icon-chevron-up" v-else />
            </template>
          </button>

          <button type="button" class="btn-like" :class="{'is-active': isLike}" @click="isLike = !isLike">좋아요 {{ boardData?.likeCnt}}</button>
          <button type="button" class="btn-scrap" :class="{'is-active': isScrap}" @click="isScrap = !isScrap">스크랩 {{ boardData.scrapCnt }}</button>
          <button type="button" class="btn-view" disabled>조회수 {{ boardData?.viewCnt }}</button>
        </div>

        <NuxtLink to="/board/1" class="btn-s-fill-main" title="목록으로">목록으로</NuxtLink>
      </div>

      <template v-if="boardData?.commentableYN">
        <CommentForm :postId="route.params.id" v-if="showComment" />
        <CommentList :postId="route.params.id" v-if="showComment" />
      </template>
    </div>
  </div>
</template>

<script setup>
const showComment = ref(true);
const isLike = ref(false);
const isScrap = ref(false);
const route = useRoute();

const { data: boardData } = await useAsyncData('boardData',
    () => $fetch(`/api/v1/boards/${route.params.id}/posts/${route.query.boardId}`, {
      params: {
        boardId: route.query.boardId,
        postId: route.params.id
      }
    })
);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/detail/post.scss');
</style>