<template>
  <div>
    <div class="list">
      <div class="title">실시간 인기글</div>

      <div
          class="list-item"
          v-for="(popular, popularIdx) in popularList"
          :key="popularIdx"
      >
        <div class="num">{{ popularIdx + 1 }}</div>

        <div class="info">
          <div class="title">
            <NuxtLink :to="`/post/${popular?.postId}?boardId=${popular?.board?.boardId}`">
              <span class="txt">{{ popular?.title }}</span>
            </NuxtLink>
          </div>

          <div class="detail">
            <div class="board-name">{{ popular?.board?.boardName }}</div>

            <div class="count">
              <span class="count-comment">{{ popular?.commentCnt }}</span>
              <span class="count-like">{{ popular?.likeCnt }}</span>
              <span class="count-view">{{ popular?.viewCnt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: popularList, execute: exePopularList } = await useAsyncData('popularList',
  () => $fetch(`/api/v1/posts/popular`)
);

onMounted(async () => {
  await exePopularList();
});
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/popular.scss');
</style>