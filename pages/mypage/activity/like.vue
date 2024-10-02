<template>
  <section class="full-width">
   <div class="section-title">공감</div>

   <div class="section-content">
     <div class="section-content-inner">
       <List
           :data="likes"
           @load-page="loadPage"
           :hasPagination="true"
       />
     </div>
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

// 게시판 목록 로드
const loadPage = async (num) => {
  pageableParams.value.page = num;

  await refreshLikes();
};

onMounted(async () => {
  await executeLikes();
});

 definePageMeta({
   layout: 'mypage'
 })
</script>