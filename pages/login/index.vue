<template>
  <div class="gate">
    <div class="gate-box">
      <div class="logo-wrap">
        <NuxtLink to="/" class="logo"></NuxtLink>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form">
          <div class="form-box">
            <div class="form-item" :class="{'is-error': errorMessage.nickname}">
              <label class="form-label">
                <input
                    type="text"
                    placeholder="아이디"
                    v-model="formData.nickname"
                    class="form-input"
                />
                <span class="form-txt" v-if="formData.nickname">아이디</span>
                <span class="form-border"></span>
              </label>
            </div>

            <div class="form-info" v-if="errorMessage.nickname">
              <span>{{ errorMessage.nickname }}</span>
            </div>
          </div>

          <div class="form-box">
            <div class="form-item" :class="{'is-error': errorMessage.password}">
              <label class="form-label">
                <input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="비밀번호"
                    v-model="formData.password"
                    class="form-input"
                />
                <span class="form-txt" v-if="formData.password">비밀번호</span>
                <span class="form-border"></span>

                <button
                    type="button"
                    class="btn-show-password"
                    @click="showPassword = !showPassword"
                    :title="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
                >
                  <i :class="showPassword ? 'icon-eye' : 'icon-eye-off'" />
                </button>
              </label>
            </div>

            <div class="form-info" v-if="errorMessage.password">
              <span>{{ errorMessage.password }}</span>
            </div>
          </div>
        </div>

        <button
            type="submit"
            class="btn-l-fill-main btn-submit"
            title="로그인"
        >
          로그인
        </button>
      </form>

      <div class="ask-box">
        <span class="txt">아직 회원이 아니신가요?</span>

        <NuxtLink
            to="/join"
            aria-label="회원가입 페이지로 이동"
            role="link"
        >
          회원가입
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();

// 토큰
const token = useLocalStorage('token', '');

// 폼 데이터
const formData = ref({
  nickname: '',
  password: ''
});

// 오류 메시지
const errorMessage = ref({
  nickname: '',
  password: ''
});

const showPassword = ref(false);

// 폼 제출
const submitForm = async () => {
  const { nickname, password } = formData.value;
  const formDataObj = { nickname, password };

  try {
    const response = await fetch('/api/v1/members/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      const data = await response.json();
      const {code, message} = data;

      token.value = message;

      await router.push('/');
    } else {
      const errorData = await response.json();
      const {code, message} = errorData;

      if (code === 'BAD_REQUEST') {
        Object.keys(message).forEach(key => {
          if (key in errorMessage.value) {
            errorMessage.value[key] = message[key];
          }
        });
      }
    }
  } catch (error) {
    console.error('에러:', error);
  }
};

definePageMeta({
  layout: 'gate'
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/gate.scss');
</style>
