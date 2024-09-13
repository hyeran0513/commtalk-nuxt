<template>
  <div class="profile-box">
    <div class="top-area">
      <template v-if="userInfo">
        <div class="profile">
          <div
              class="profile-img"
              v-if="profile?.fileUrl"
              :style="{background: `url(${ profile?.fileUrl }) no-repeat center/auto 100%`}"
          />

          <div class="profile-default" v-else />

          <NuxtLink to="/info" class="btn-setting">
            <i class="icon-settings" />
          </NuxtLink>
        </div>

        <div class="user-info">
          <div class="user-name">{{ userInfo?.username }}님</div>
          <div class="user-id">{{ userInfo?.nickname }}</div>
        </div>
      </template>

      <template v-else>
        로그인이 필요한 서비스입니다.
      </template>
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

const { data: userInfo, execute: exeUserInfo } = await useAsyncData('userInfo',
  () => $fetch(`/api/v1/members/me`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  })
);

// 회원 프로필 사진 조회
const { data: profile, execute: exeProfile } = await useAsyncData('profile',
    () => $fetch(`/api/v1/files/profile`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

onMounted(async () => {
  await exeUserInfo();
  await exeProfile();
});
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/profile-box.scss');
</style>