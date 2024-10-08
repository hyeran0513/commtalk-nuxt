<template>
  <section class="full-width">
    <div class="section-title">내가 쓴 글</div>

    <div class="section-content">
      <div class="section-content-inner">
        <List
            :data="posts"
            @load-page="loadPage"
            :hasPagination="true"
            v-if="posts?.posts?.length > 0"
        />

        <template v-else>
          <BaseNodata text="내가 쓴 글이 없습니다." />
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

// 게시판 목록 로드
const loadPage = async (num) => {
  pageableParams.value.page = num;

  await refreshPosts();
};

onMounted(async () => {
  await executePosts();
});

definePageMeta({
  layout: 'mypage'
})
</script>