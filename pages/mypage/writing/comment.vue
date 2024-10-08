<template>
  <section class="full-width">
    <div class="section-title">댓글 단 글</div>

    <div class="section-content">
      <div class="section-content-inner">
        <List
            :data="comments"
            @load-page="loadPage"
            :hasPagination="true"
            v-if="comments?.posts?.length > 0"
        />

        <template v-else>
          <BaseNodata text="댓글 단 글이 없습니다." />
        </template>
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

// 게시판 목록 로드
const loadPage = async (num) => {
  pageableParams.value.page = num;

  await refreshComments();
};

onMounted(async () => {
  await executeComments();
});

definePageMeta({
  layout: 'mypage'
})
</script>