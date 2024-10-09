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
import {onMounted} from "vue";

const router = useRouter();

const token = useLocalStorage('token', '');

// 로그인 여부
const isLogin = ref(false);

// 로그아웃
const logout = () => {
  token.value = '';
  router.push('/login');
};

const gnbList = ref([
  { txt: '로그인', link: '/login' },
  { txt: '회원가입', link: '/join' }
]);

// 토큰 유효성 체크
const checkTokenValidate = async () => {
  try {
    const response = await fetch(`/api/v1/members/token/validate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log("성공");
      isLogin.value = true;
    } else {
      console.log("성공X");
    }
  } catch (error) {
    console.error('에러:', error);
  }
}

onMounted(() => {
  checkTokenValidate();
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/sub-header.scss');
</style>