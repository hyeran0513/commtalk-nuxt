<template>
  <div class="wrapper">
    <div class="layout bg-white">
      <LayoutSubHeader />
      <LayoutHeader @userInfoLoaded="handleUserInfoLoaded" />
      <LayoutCategory />
      <LayoutBackButton />
      <LayoutQuickButton />

      <div class="content" v-if="isUserInfoLoaded">
        <slot />
      </div>

      <LayoutFooter />
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

const isUserInfoLoaded = ref(false);

const handleUserInfoLoaded = () => {
  isUserInfoLoaded.value = true;
};
</script>