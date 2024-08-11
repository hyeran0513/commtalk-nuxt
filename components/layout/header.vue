<template>
  <header>
    <div class="header-inner">
      <NuxtLink to="/" class="logo"></NuxtLink>

      <div class="search" v-if="!isGate">
        <div class="search-inner">
          <input type="text" placeholder="검색어를 입력해 주세요." />

          <button type="button" title="검색">
            <i class="icon-search" />
          </button>
        </div>
      </div>

      <NuxtLink to="/mypage" class="btn-mypage" title="마이페이지" v-if="!isGate && token">
        <i class="icon-user" />
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import {useLocalStorage} from "@vueuse/core";

const token = useLocalStorage('token', '');
const props = defineProps(['isGate']);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/header.scss');
</style>

