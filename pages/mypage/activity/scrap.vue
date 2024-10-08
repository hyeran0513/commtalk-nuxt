<template>
  <section class="full-width">
    <div class="section-title">스크랩</div>

    <div class="section-content">
      <div class="section-content-inner">
        <List
            :data="scraps"
            @load-page="loadPage"
            :hasPagination="true"
            v-if="scraps?.posts?.length > 0"
        />

        <template v-else>
          <BaseNodata text="스크랩 항목이 없습니다." />
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

// 게시판 목록 로드
const loadPage = async (num) => {
  pageableParams.value.page = num;

  await refreshScraps();
};

onMounted(async () => {
  await executeScraps();
});

definePageMeta({
  layout: 'mypage'
})
</script>