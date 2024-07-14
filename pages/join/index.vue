<template>
  <div class="gate">
    <div class="gate-box">
      <div class="title">회원가입</div>

      <div class="form">
        <div class="form-box">
          <dl class="form-item" :class="{'is-error': errorMessage.nickname}">
            <dt>아이디</dt>
            <dd>
              <input type="text" v-model="formData.nickname" placeholder="아이디를 입력해 주세요." />
            </dd>
          </dl>

          <div class="form-info" v-if="errorMessage.nickname">{{ errorMessage.nickname }}</div>
        </div>

        <div class="form-box">
          <dl class="form-item" :class="{'is-error': errorMessage.password}">
            <dt>비밀번호</dt>
            <dd class="col">
              <input type="password" v-model="formData.password" placeholder="비밀번호를 입력해 주세요." />
              <input type="password" v-model="formData.confirmPassword" placeholder="비밀번호를 한번 더 입력해 주세요." />
            </dd>
          </dl>

          <div class="form-info" v-if="errorMessage.password">{{ errorMessage.password }}</div>
        </div>

        <div class="form-box">
          <dl class="form-item" :class="{'is-error': errorMessage.username}">
            <dt>이름</dt>
            <dd>
              <input type="text" v-model="formData.username" placeholder="이름을 입력해 주세요." />
            </dd>
          </dl>

          <div class="form-info" v-if="errorMessage.username">{{ errorMessage.username }}</div>
        </div>

        <div class="form-box">
          <dl class="form-item" :class="{'is-error': errorMessage.email}">
            <dt>이메일</dt>
            <dd class="email">
              <div class="flex-box">
                <input type="text" placeholder="example" v-model="formData.emailPrefix" />
                <span>@</span>
                <input type="text" placeholder="example.com" v-model="formData.emailDomain" :disabled="formData.selectedDomain !== '직접입력'" />
              </div>

              <select v-model="formData.selectedDomain" @change="handleDomainChange">
                <option value="직접입력">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="kakao.net">kakao.net</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </dd>
          </dl>

          <div class="form-info" v-if="errorMessage.email">{{ errorMessage.email }}</div>
        </div>

        <div class="form-box">
          <dl class="form-item" :class="{'is-error': errorMessage.phone}">
            <dt>연락처</dt>
            <dd>
              <input type="tel" v-model="formData.phone" placeholder="연락처를 입력해 주세요." @input="formatPhoneNumber()" />
            </dd>
          </dl>
        </div>

        <div class="form-info" v-if="errorMessage.phone">{{ errorMessage.phone }}</div>
      </div>

      <button type="submit" class="btn-f-fill-main btn-submit" title="가입하기" @click="submitForm">가입하기</button>
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
      <button type="button" class="btn-main" @click="modal.modalClose()">확인</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue';

// 모달
const modal = ref();

// 폼 데이터
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  emailPrefix: '',
  emailDomain: '',
  selectedDomain: '직접입력',
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

// 이메일 도메인 변경 핸들러
const handleDomainChange = () => {
  formData.value.emailDomain = formData.value.selectedDomain === '직접입력' ? '' : formData.value.selectedDomain;
};

// 전화번호 포맷팅
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
  const { username, password, confirmPassword, nickname, emailPrefix, emailDomain, phone } = formData.value;

  const formDataObj = {
    username,
    password,
    confirmPassword,
    nickname,
    email: `${emailPrefix}@${emailDomain}`,
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
        console.log(message);
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
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/gate.scss');
</style>