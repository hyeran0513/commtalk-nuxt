<template>
  <div class="wrapper">
    <LayoutHeader v-if="mobileVersion" />

    <div class="layout mypage">
      <LayoutMypageHeader @userInfoLoaded="handleUserInfoLoaded" />
      <LayoutMypageQuickButton />

      <div class="mypage-container">
        <LayoutMypageSideBar />
        <div class="content">
          <slot v-if="isUserInfoLoaded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const mobileVersion = ref(false);
const isUserInfoLoaded = ref(false);

const getWindowWidth = () => {
  const windowWidth = window.innerWidth;
  mobileVersion.value = windowWidth < 600;
};

const handleUserInfoLoaded = () => {
  isUserInfoLoaded.value = true;
};

onMounted(() => {
  getWindowWidth();
  window.addEventListener('resize', getWindowWidth);
});
</script>
