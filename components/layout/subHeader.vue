<template>
  <div class="sub-header">
    <div class="sub-header-inner">
      <ul class="gnb">
        <!-- 로그인일 경우 -->
        <template v-if="isLogin">
          <li class="gnb-item">
            <button
                type="button"
                title="로그아웃"
                @click="logout()"
            >
              로그아웃
            </button>
          </li>
        </template>
        <!-- // 로그인일 경우 -->

        <!-- 비로그인일 경우 -->
        <template v-else>
          <li
              class="gnb-item"
              v-for="(gnb, gnbIdx) in gnbList"
              :key="gnbIdx"
          >
            <NuxtLink
                :to="gnb?.link"
                :title="gnb?.txt"
            >
              {{ gnb?.txt }}
            </NuxtLink>
          </li>
        </template>
        <!-- // 비로그인일 경우 -->
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();

const token = useLocalStorage('token', '');

// 로그인 여부
const isLogin = computed(() => {
  return !!token.value;
});

// 로그아웃
const logout = () => {
  token.value = '';
  router.push('/login');
};

const gnbList = ref([
  { txt: '로그인', link: '/login' },
  { txt: '회원가입', link: '/join' }
]);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/sub-header.scss');
</style>