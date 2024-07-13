<template>
  <div class="gate">
    <div class="gate-box">
      <div class="title">회원가입</div>

      <div class="form">
        <div class="form-box">
          <dl class="form-item">
            <dt>아이디</dt>
            <dd>
              <input type="text" v-model="formData.username" placeholder="아이디를 입력해 주세요." />
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>비밀번호</dt>
            <dd class="col">
              <input type="password" v-model="formData.password" placeholder="비밀번호를 입력해 주세요." />
              <input type="password" v-model="formData.confirmPassword" placeholder="비밀번호를 한번 더 입력해 주세요." />
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>이름</dt>
            <dd>
              <input type="text" v-model="formData.nickname" placeholder="이름을 입력해 주세요." />
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
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
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>연락처</dt>
            <dd>
              <input type="tel" v-model="formData.phone" placeholder="연락처를 입력해 주세요." />
            </dd>
          </dl>
        </div>
      </div>

      <button type="submit" class="btn-f-fill-main btn-submit" title="가입하기" @click="submitForm">가입하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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

const handleDomainChange = () => {
  formData.value.emailDomain = formData.value.selectedDomain === '직접입력' ? '' : formData.value.selectedDomain;
};

const submitForm = async () => {
  const { username, password, confirmPassword, nickname, emailPrefix, emailDomain, phone } = formData.value;

  const formDataObj = {
    username,
    password,
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
      console.log('성공');
    } else {
      console.error('성공X');
    }
  } catch (error) {
    console.error('에러:', error);
  }
};
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/gate.scss');
</style>
