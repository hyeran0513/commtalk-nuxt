<template>
  <header>
    <div class="header-inner">
      <div class="logo-wrap">
        <NuxtLink to="/" class="logo"></NuxtLink>
      </div>

      <div class="user-info">
        <div class="profile">
          <div class="profile-default"></div>
        </div>

        <div class="user">
          <div class="user-name">{{ userInfo?.username }}님</div>
          <div class="user-id">{{ userInfo?.nickname }}</div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { useUserInfoStore } from '@/stores/userInfo';

const token = useLocalStorage('token', '');
const userInfoStore = useUserInfoStore();

const { data: userInfo, execute: exeUserInfo } = await useAsyncData('userInfo',
    () => $fetch(`/api/v1/members/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

onMounted(async () => {
  await exeUserInfo();
  userInfoStore.updateUserInfo(userInfo.value);
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/mypage-header.scss');
</style>