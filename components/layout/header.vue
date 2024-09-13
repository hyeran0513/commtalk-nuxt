<template>
  <header>
    <div class="header-inner">
      <button
          class="back-btn"
          type="button"
          title="뒤로 가기"
          @click="goBack"
          v-if="route.path !== '/'"
      >
        <i class="icon-chevron-left" />
      </button>

      <NuxtLink to="/" class="logo"></NuxtLink>

      <LayoutSearch v-if="!isGate" />

      <div class="btn-wrap">
        <button
            type="button"
            class="btn-menu"
            title="햄버거 메뉴"
            @click="mobNavMove('open')"
        >
          <i class="icon-menu" />
        </button>

        <NuxtLink
            to="/mypage"
            class="btn-mypage"
            title="마이페이지"
            v-if="!isGate && token"
        >
          <i class="icon-user" />
        </NuxtLink>
      </div>

      <transition name="slide-left">
        <MobileNav
            v-if="mobNavShow"
            @mobNavMove="mobNavMove"
        />
      </transition>
    </div>
  </header>
</template>

<script setup>
import {useLocalStorage} from "@vueuse/core";
import { useMenuStore } from '@/stores/menu';
import MobileNav from "~/components/layout/mobileNav.vue";
import {ref} from "vue";

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

const mobNavShow = ref(false);

const mobNavMove = (type) => {
  if (type === 'open') {
    document.querySelector('body').classList.add('is-fixed');
    mobNavShow.value = true;
  } else {
    document.querySelector('body').classList.remove('is-fixed');
    mobNavShow.value = false;
  }
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/header.scss');
</style>

