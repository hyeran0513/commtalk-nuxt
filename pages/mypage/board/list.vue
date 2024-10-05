<template>
  <section class="full-width">
    <div class="section-title">게시판 요청 목록</div>

    <div class="section-content">
      <div class="section-content-inner">
        <div ref="gridElement"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import {ref, onMounted} from "vue";

const { $toastGrid } = useNuxtApp();
const gridElement = ref(null);

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

  // 그리드 데이터로 변환
  const gridData = board.value.boardReqs.map((req) => ({
    requestId: req.boardReqId,
    boardName: req.boardName,
    description: req.description,
    requesterNickname: req.requester.nickname,
    status: req.reqSts
  }));

  // 그리드 생성
  const grid = new $toastGrid({
    el: gridElement.value,
    data: gridData,  // 가공된 데이터
    columns: [
      { header: 'No', name: 'requestId' },
      { header: '게시판', name: 'boardName' },
      { header: '설명', name: 'description' },
      { header: '요청자', name: 'requesterNickname' },
      { header: '상태', name: 'status' }
    ],
  });
});

definePageMeta({
  layout: 'mypage'
});
</script>