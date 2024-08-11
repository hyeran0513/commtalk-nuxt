<template>
  <div class="gate">
    <div class="gate-box">
      <div class="title">로그인</div>

      <form @submit.prevent="submitForm">
        <div class="form">
          <div class="form-box">
            <dl class="form-item" :class="{'is-error': errorMessage.nickname}">
              <dt>아이디</dt>
              <dd>
                <input type="text" placeholder="아이디를 입력해 주세요." v-model="formData.nickname" />
              </dd>
            </dl>

            <div class="form-info" v-if="errorMessage.nickname">{{ errorMessage.nickname }}</div>
          </div>

          <div class="form-box">
            <dl class="form-item" :class="{'is-error': errorMessage.password}">
              <dt>비밀번호</dt>
              <dd>
                <input type="password" placeholder="비밀번호를 입력해 주세요." v-model="formData.password" />
              </dd>
            </dl>

            <div class="form-info" v-if="errorMessage.password">{{ errorMessage.password }}</div>
          </div>
        </div>

        <button
            type="submit"
            class="btn-f-fill-main btn-submit"
            title="로그인"
        >
          로그인
        </button>
      </form>
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
