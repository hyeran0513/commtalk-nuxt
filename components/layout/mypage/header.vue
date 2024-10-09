<template>
  <header>
    <div class="header-inner">
      <div class="logo-wrap">
        <NuxtLink to="/" class="logo"></NuxtLink>
      </div>

      <div class="user-info">
        <div class="profile">
          <div
              class="profile-img"
              v-if="profile?.fileUrl"
              :style="{background: `#f8f8f8 url(${ profile?.fileUrl }) no-repeat center/auto 100%`}"
          />

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
const emit = defineEmits(['userInfoLoaded']);

const token = useLocalStorage('token', '');
const userInfoStore = useUserInfoStore();

// 회원 프로필 사진 조회
const { data: profile, execute: exeProfile, refresh: refreshProfile } = await useAsyncData('profile',
    () => $fetch(`/api/v1/files/profile`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

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

  emit('userInfoLoaded');
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/mypage-header.scss');
</style>