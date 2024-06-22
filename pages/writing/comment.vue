<template>
  <section>
   <div class="section-title">댓글 단 글</div>
 
   <div class="section-content">
     <div class="section-content-inner">
       <List :data="data" />
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