<template>
  <header>
    <div class="header-inner">
      <button
          class="back-btn"
          type="button"
          title="뒤로 가기"
          @click="goBack"
      >
        <i class="icon-chevron-left" />
      </button>

      <NuxtLink to="/" class="logo"></NuxtLink>

      <div class="search" v-if="!isGate">
        <div class="search-inner">
          <input
              type="text"
              placeholder="검색어를 입력해 주세요."
          />

          <button type="button" title="검색">
            <i class="icon-search" />
          </button>
        </div>
      </div>

      <div class="btn-wrap">
        <NuxtLink
            to="/mypage"
            class="btn-mypage"
            title="마이페이지"
            v-if="!isGate && token"
        >
          <i class="icon-user" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import {useLocalStorage} from "@vueuse/core";
import { useMenuStore } from '@/stores/menu';

const token = useLocalStorage('token', '');
const props = defineProps(['isGate']);
const menuStore = useMenuStore();
const route = useRoute();
const router = useRouter();

watch(() => route.path, (newPath) => {
  menuStore.updateButtons(route);
});

const goBack = () => {
  if (menuStore.backButtonConfig) {
    router.push(menuStore.backButtonConfig.route);
  } else {
    router.back();
  }
};
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/header.scss');
</style>

