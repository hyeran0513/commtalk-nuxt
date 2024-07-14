<template>
  <div class="profile-box">
    <div class="top-area">
      <div class="profile">
        <div class="profile-img" v-if="userInfo?.profile" :style="{background: `url(${ userInfo?.PROFILE }) no-repeat center/auto 100%`}"></div>
        <div class="profile-default" v-else></div>

        <NuxtLink to="/info" class="btn-setting">
          <i class="icon-settings" />
        </NuxtLink>
      </div>

      <div class="user-info">
        <div class="user-name">{{ userInfo?.username }}님</div>
        <div class="user-id">{{ userInfo?.nickname }}</div>
      </div>
    </div>

    <div class="btn-wrap">
      <NuxtLink to="/writing/comment" title="내 댓글">내 댓글</NuxtLink>
      <NuxtLink to="/activity/like" title="내 공감">내 공감</NuxtLink>
      <NuxtLink to="/activity/scrap" title="내 스크랩">내 스크랩</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage('token', '');

const { data: userInfo } = await useAsyncData('userInfo',
  () => $fetch(`/api/v1/members/me`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  })
);
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/profile-box.scss');
</style>