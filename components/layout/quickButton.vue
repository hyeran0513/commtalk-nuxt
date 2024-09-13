<template>
  <div class="quick-buttons">
    <NuxtLink
        :to="{ path: '/write', query: { boardId: route.params.id }}"
        class="write-btn"
        title="글 쓰기"
        v-if="menuStore.showWriteButton"
    >
      <i class="icon-edit" />
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

const menuStore = useMenuStore();
const route = useRoute();

const goScrollTop = () => {
  window.scroll({
    top: 0,
    behavior: 'smooth'
  })
}
</script>