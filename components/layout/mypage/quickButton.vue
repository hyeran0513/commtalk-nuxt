<template>
  <div class="quick-buttons">
    <NuxtLink
        to="/mypage"
        class="mypage-btn"
        title="마이페이지 홈"
    >
      <i class="icon-home" />
    </NuxtLink>

    <button
        type="button"
        class="top-btn"
        @click="goScrollTop"
        title="맨 위로 위동"
    >
      <i class="icon-arrow-up" />
    </button>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'

const route = useRoute();

const goScrollTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
}
</script>