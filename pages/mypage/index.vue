<template>
  <section class="bg-transparency full-width">
    <div class="widget">
      <div class="widget-item">
        <div class="title">
          <span class="txt">내가 쓴 글</span>
          <NuxtLink to="/writing/post" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="posts" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">댓글 단 글</span>
          <NuxtLink to="/writing/comment" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="comments" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">공감</span>
          <NuxtLink to="/activity/like" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="likes" />
        </div>
      </div>

      <div class="widget-item">
        <div class="title">
          <span class="txt">스크랩</span>
          <NuxtLink to="/activity/scrap" class="btn-more"><i class="icon-plus" /></NuxtLink>
        </div>
        
        <div class="content">
          <List :data="scraps" />
        </div>
      </div>

<!--      <div class="widget-item">-->
<!--        <div class="title">-->
<!--          <span class="txt">신고</span>-->
<!--          <NuxtLink to="/activity/report" class="btn-more"><i class="icon-plus" /></NuxtLink>-->
<!--        </div>-->
<!--        -->
<!--        <div class="content">-->
<!--          <List :data="data" />-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </section>
</template>

<script setup>
import {ref} from "vue";
import { useLocalStorage } from '@vueuse/core';

const token = useLocalStorage('token', '');

const pageableParams = ref({
  page: 0
});

// 회원 작성 게시글 목록 조회
const { data: posts, refresh: refreshPosts, execute: executePosts } = await useAsyncData('posts',
    () => $fetch(`/api/v1/posts/me/posted`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      params: {
        page: JSON.stringify(pageableParams.value.page)
      }
    })
);

// 회원 댓글 작성 게시글 목록 조회
const { data: comments, refresh: refreshComments, execute: executeComments } = await useAsyncData('comments',
  () => $fetch(`/api/v1/posts/me/commented`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    },
    params: {
      page: JSON.stringify(pageableParams.value.page)
    }
  })
);

// 회원 좋아요 게시글 목록 조회
const { data: likes, refresh: refreshLikes, execute: executeLikes } = await useAsyncData('likes',
  () => $fetch(`/api/v1/posts/me/liked`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    },
    params: {
      page: JSON.stringify(pageableParams.value.page)
    }
  })
);

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

definePageMeta({
  layout: 'mypage'
})
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/mypage.scss');
</style>