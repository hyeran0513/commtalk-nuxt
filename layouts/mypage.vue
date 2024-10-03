<template>
  <div class="wrapper">
    <LayoutHeader v-if="mobileVersion" />

    <div class="layout mypage">
      <LayoutMypageHeader />
      <LayoutMypageQuickButton />

      <div class="mypage-containe">
        <LayoutMypageSideBar />

        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mobileVersion = ref(false);

const getWindowWidth = () => {
  const windowWidth = window.innerWidth;
  mobileVersion.value = windowWidth < 600;
}

onMounted(() => {
  getWindowWidth();
  addEventListener('resize', getWindowWidth);
})
</script>