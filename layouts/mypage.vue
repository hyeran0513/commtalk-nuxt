<template>
  <div class="wrapper">
    <LayoutHeader v-if="mobileVersion" />
    <LayoutMypageSideBar />

    <div class="layout">
      <LayoutMypageHeader />
      <LayoutMypageQuickButton />

      <div class="content">
        <slot />
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