<template>
  <header>
    <div class="header-inner">
      <div class="user-info">
        <div class="profile">
          <div class="profile-default"></div>
        </div>

        <div class="user-name">{{ userInfo?.username }}</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage('token', '');

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
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/mypage-header.scss');
</style>