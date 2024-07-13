<template>
  <div class="list">
    <div class="list-item" v-for="(item, i) in data" :key="i">
      <NuxtLink :to="`/post/${item?.postId}?boardId=${boardId}`">
        <div class="title">{{ item?.title }}</div>
        <div class="content">{{ item?.previewContent }}</div>

        <div class="bottom-area">
          <div class="count">
            <span class="count-comment">{{ item?.commentCnt }}</span>
            <span class="count-view">{{ item?.viewCnt }}</span>
            <span class="count-like">{{ item?.likeCnt }}</span>
          </div>

          <div class="user-info">
            <div class="user-profile">
              <div class="user-profile-img" v-if="item?.USER_INFO?.USER_PROFILE"></div>
              <div class="user-profile-default"></div>
            </div>

            <div class="user-name">{{ item?.authorName }}</div>

            <div class="date">{{ item?.updatedAt }}</div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['data', 'boardId']);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/list.scss');
</style>