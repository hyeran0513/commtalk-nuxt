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

          <div class="form-box">
            <div class="form-item" :class="{'is-error': errorMessage.confirmPassword}">
              <label class="form-label">
                <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="비밀번호 확인"
                    v-model="formData.confirmPassword"
                    class="form-input"
                />
                <span class="form-txt" v-if="formData.confirmPassword">비밀번호 확인</span>
                <span class="form-border"></span>

                <button
                    type="button"
                    class="btn-show-password"
                    @click="showConfirmPassword = !showConfirmPassword"
                    :title="showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
                >
                  <i :class="showConfirmPassword ? 'icon-eye' : 'icon-eye-off'" />
                </button>
              </label>
            </div>

            <div class="form-info" v-if="errorMessage.confirmPassword">
              <span>{{ errorMessage.confirmPassword }}</span>
            </div>
          </div>

          <div class="form-box">
            <div class="form-item" :class="{'is-error': errorMessage.username}">
              <label class="form-label">
                <input
                    type="text"
                    placeholder="이름"
                    v-model="formData.username"
                    class="form-input"
                />
                <span class="form-txt"  v-if="formData.username">이름</span>
                <span class="form-border"></span>
              </label>
            </div>

            <div class="form-info" v-if="errorMessage.username">
              <span>{{ errorMessage.username }}</span>
            </div>
          </div>

          <div class="form-box">
            <div class="form-item" :class="{'is-error': errorMessage.email}">
              <label class="form-label">
                <input
                    type="text"
                    placeholder="이메일"
                    v-model="formData.email"
                    @input="handleInput"
                    @blur="handleBlur"
                    @focus="handleFocus"
                    class="form-input"
                />
                <span class="form-txt" v-if="formData.email">이메일</span>
                <span class="form-border"></span>
              </label>
            </div>

            <div class="form-info" v-if="errorMessage.email">
              <span>{{ errorMessage.email }}</span>
            </div>
          </div>

          <div class="form-box">
            <div class="form-item" :class="{'is-error': errorMessage.phone}">
              <label class="form-label">
                <input
                    type="text"
                    placeholder="연락처 (-없이 숫자만 입력해 주세요.)"
                    v-model="formData.phone"
                    @input="formatPhoneNumber"
                    class="form-input"
                />
                <span class="form-txt"  v-if="formData.phone">연락처</span>
                <span class="form-border"></span>
              </label>
            </div>

            <div class="form-info" v-if="errorMessage.phone">
              <span>{{ errorMessage.phone }}</span>
            </div>
          </div>
        </div>

        <button
            type="submit"
            class="btn-l-fill-main btn-submit"
            title="가입하기"
        >
          가입하기
        </button>
      </form>

      <div class="ask-box">
        <span class="txt">이미 회원이신가요?</span>

        <NuxtLink
            to="/login"
            aria-label="로그인 페이지로 이동"
            role="link"
        >
          로그인
        </NuxtLink>
      </div>
    </div>
  </div>

  <BaseModal ref="modal">
    <template #default>
      <div class="alert">
        <i class="icon-check-circle" />
        <div class="txt">회원가입이 완료되었습니다.</div>
      </div>
    </template>

    <template #footer>
      <button
          type="button"
          class="btn-main"
          @click="confirmJoin"
          title="확인"
      >
        확인
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';

const router = useRouter();

// 모달
const modal = ref();

// 폼 데이터
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  email: '',
  phone: ''
});

// 오류 메시지
const errorMessage = ref({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  email: '',
  phone: ''
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const isBlurred = ref(false);

// 이메일 유효성 검사
const validateEmail = () => {
  errorMessage.value.email = (!formData.value.email.includes('@'))
      ? '@를 포함한 올바른 이메일 형식으로 입력해 주세요.'
      : '';
};

const handleBlur = () => {
  isBlurred.value = true;
  validateEmail();
};

// Focus 후 실시간 이메일 유효성 검사 시작
const handleFocus = () => {
  if (isBlurred.value && errorMessage.value.email) {
    validateEmail();
  }
};

// blur된 후 입력 중 실시간 이메일 유효성 검사
const handleInput = () => {
  if (isBlurred.value) {
    validateEmail();
  }
};

// 연락처 포맷팅
const formatPhoneNumber = () => {
  formData.value.phone = formData.value.phone
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

/* 비밀번호 일치 확인 */
const validatePasswords = () => {
  errorMessage.value.password = (formData.value.password && formData.value.confirmPassword && formData.value.password !== formData.value.confirmPassword)
      ? '비밀번호가 일치하지 않습니다.'
      : '';
};

watch(() => formData.value.password,
    validatePasswords
);

watch(() => formData.value.confirmPassword,
    validatePasswords
);
/* END: 비밀번호 일치 확인 */

// 폼 제출
const submitForm = async () => {
  const { username, password, confirmPassword, nickname, email, phone } = formData.value;

  const formDataObj = {
    username,
    password,
    confirmPassword,
    nickname,
    email,
    phone
  };

  try {
    const response = await fetch('/api/v1/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      modal.value.modalOpen();
    } else {
      const errorData = await response.json();
      const { code, message } = errorData;

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

const confirmJoin = () => {
  modal.value.modalClose();
  router.push('/login');
}

definePageMeta({
  layout: 'gate'
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/gate.scss');
</style>