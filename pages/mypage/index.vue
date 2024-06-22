<template>
  <section class="bg-transparency">
    <div class="widget">
      <div class="widget-item">
        <div class="title">
          <span class="txt">내가 쓴 글</span>
          <NuxtLink to="/writing/post" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="data" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">댓글 단 글</span>
          <NuxtLink to="/writing/comment" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="data" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">공감</span>
          <NuxtLink to="/activity/like" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="data" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">스크랩</span>
          <NuxtLink to="/activity/scrap" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="data" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">신고</span>
          <NuxtLink to="/activity/report" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="data" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
 const data = reactive([
   {
     POST_ID: '1',
     TITLE: '자유게시판01',
     CONTENT: '자유게시판 내용',
     COUNT: {
       COMMENT: '10',
       VIEW: '10',
       LIKE: '10'
     },
     USER_INFO: {
       USER_PROFILE: '',
       USER_NAME: '홍길동'
     },
     CREATE_DATE: '2024.06.19',
     MODIFY_DATE: '2024.06.19'
   },
   {
     POST_ID: '2',
     TITLE: '자유게시판02',
     CONTENT: '자유게시판 내용',
     COUNT: {
       COMMENT: '10',
       VIEW: '10',
       LIKE: '10'
     },
     USER_INFO: {
       USER_PROFILE: '',
       USER_NAME: '홍길동'
     },
     CREATE_DATE: '2024.06.19',
     MODIFY_DATE: '2024.06.19'
   }
 ])

  definePageMeta({
    layout: 'mypage'
  })
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/mypage.scss');
</style>