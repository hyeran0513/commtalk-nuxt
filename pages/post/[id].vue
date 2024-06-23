<template>
  <div class="post">
    <div class="post-inner">
      <div class="title">{{ boardData.TITLE }}</div>
      <div class="content">{{ boardData.CONTENT }}</div>
      <div class="user-info">
        <div class="profile">
          <div class="profile-img" v-if="boardData.USER_INFO.PROFILE"></div>
          <div class="profile-default" v-else></div>
        </div>

        <div class="user-name">{{ boardData.USER_INFO.USER_NAME }}</div>
        <div class="date">{{ boardData.DATE }}</div>
      </div>


      <div class="btn-wrap">
        <div class="btn-group">
          <button type="button" class="btn-comment" @click="showComment = !showComment">
            <span class="txt">댓글 {{ boardData.COUNT.COMMENT }}</span> 
            <i class="icon-chevron-down" v-if="showComment" />
            <i class="icon-chevron-up" v-else />
          </button>

          <button type="button" class="btn-like" :class="{'is-active': isLike}" @click="isLike = !isLike">좋아요 {{ boardData.COUNT.LIKE }}</button>
          <button type="button" class="btn-scrap" :class="{'is-active': isScrap}" @click="isScrap = !isScrap">스크랩 {{ boardData.COUNT.SCRAP }}</button>
          <button type="button" class="btn-view" disabled>조회수 {{ boardData.COUNT.VIEW }}</button>
        </div>

        <NuxtLink to="/board/1" class="btn-s-fill-main" title="목록으로">목록으로</NuxtLink>
      </div>

      <CommentForm v-if="showComment" />
      <CommentList v-if="showComment" />
    </div>
  </div>
</template>

<script setup>
const showComment = ref(true);
const isLike = ref(false);
const isScrap = ref(false);

const boardData = reactive({
  USER_INFO: {
    PROFILE: '',
    USER_NAME: '홍길동'
  },
  TITLE: '제목',			
  DATE: '2024.06.19',
  CONTENT: '내용',
  COUNT: {
    LIKE: '10',
    COMMENT: '10',
    VIEW: '10',
    SCRAP: '10'
  }
});

const data = reactive([
	{
		COMMENT_ID: '1',
		TAG: '김혜란',
		USER_INFO: {
			PROFILE: '',
			USER_NAME: '홍길동'
		},
		CONTENT: '내용',
		CREATE_DATE: '2024.06.19',
		MODIFY_DATE: '2024.06.20'
	},
	{
		COMMENT_ID: '2',
    UPPER_ID: '1',
		TAG: '김혜란',
		USER_INFO: {
			PROFILE: '',
			USER_NAME: '홍길동'
		},
		CONTENT: '내용',
		CREATE_DATE: '2024.06.19',
		MODIFY_DATE: '2024.06.20'
	}
]);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/detail/post.scss');
</style>