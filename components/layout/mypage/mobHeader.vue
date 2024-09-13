<template>
  <header>
    <div class="header-inner">
      <NuxtLink to="/" class="logo"></NuxtLink>

      <div class="btn-wrap">
        <button
            type="button"
            class="btn-logout"
            title="로그아웃"
            @click="logout()"
        >
          <i class="icon-log-out" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import {useLocalStorage} from "@vueuse/core";

const token = useLocalStorage('token', '');
const route = useRoute();
const router = useRouter();

// 로그아웃
const logout = () => {
  token.value = '';
  router.push('/login');
};
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/header.scss');
</style>

