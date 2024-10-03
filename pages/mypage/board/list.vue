<template>
  <section class="full-width">
    <div class="section-title">게시판 요청 목록</div>

    <div class="section-content">
      <div class="section-content-inner">
        <List
            :data="board"
            @load-page="loadPage"
            :hasPagination="true"
            v-if="board?.length > 0"
        />

        <template v-else>
          <BaseNodata text="게시판 요청 목록이 없습니다." />
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import {ref, onMounted} from "vue";

const token = useLocalStorage('token', '');

const pageableParams = ref({
  page: 0
});

// 게시판 생성 요청 목록 조회
const { data: board, refresh: refreshBoard, execute: executeBoard } = await useAsyncData('board',
    () => $fetch(`/api/v1/boards/requests`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      params: {
        page: JSON.stringify(pageableParams.value.page)
      }
    })
);

// 게시판 생성 요청 목록 로드
const loadPage = async (num) => {
  pageableParams.value.page = num;
  await refreshBoard();
};

onMounted(async () => {
  await executeBoard();
});

definePageMeta({
  layout: 'mypage'
});
</script>