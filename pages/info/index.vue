<template>
  <section class="full-width">
    <div class="section-title">개인정보 변경</div>

    <div class="section-content">
      <div class="section-content-inner w-600">
        <template v-if="showForm">
          <div class="form">
            <div class="form-box">
              <dl class="form-item">
                <dt>아이디</dt>
                <dd>
                  <input
                      type="text"
                      placeholder="아이디를 입력해 주세요."
                      v-model="formData.nickname"
                      disabled
                  />
                </dd>
              </dl>
            </div>

            <div class="form-box">
              <dl class="form-item">
                <dt>비밀번호</dt>
                <dd>
                  <button
                      type="button"
                      class="btn-s-fill-main"
                      @click="showChangePwd = !showChangePwd"
                  >
                    비밀번호 변경
                  </button>
                </dd>
              </dl>
            </div>

            <div class="form-box" v-show="showChangePwd">
              <dl class="form-item">
                <dt>비밀번호 변경</dt>
                <dd class="change-pwd">
                  <input
                      type="password"
                      placeholder="기존 비밀번호를 입력해 주세요."
                      v-model="formData.currentPassword"
                  />

                  <input
                      type="password"
                      placeholder="새 비밀번호를 입력해 주세요."
                      v-model="formData.newPassword"
                  />

                  <input
                      type="password"
                      placeholder="새 비밀번호를 한번 더 입력해 주세요."
                      v-model="formData.confirmPassword"
                  />
                </dd>
              </dl>
            </div>

            <div class="form-box">
              <dl class="form-item" :class="{'is-error': errorMessage.username}">
                <dt>이름</dt>
                <dd>
                  <input
                      type="text"
                      placeholder="이름을 입력해 주세요."
                      v-model="formData.username"
                  />
                </dd>
              </dl>

              <div class="form-info" v-if="errorMessage.username">{{ errorMessage.username }}</div>
            </div>

            <div class="form-box">
              <dl class="form-item" :class="{'is-error': errorMessage.email}">
                <dt>이메일</dt>
                <dd class="email">
                  <div class="flex-box">
                    <input
                        type="text"
                        placeholder="example"
                        v-model="formData.emailPrefix"
                    />

                    <span>@</span>

                    <input
                        type="text"
                        placeholder="example.com"
                        v-model="formData.emailDomain"
                    />
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
              <dl class="form-item">
                <dt>연락처</dt>
                <dd>
                  <input type="text" placeholder="연락처를 입력해 주세요." v-model="formData.phone" @input="formatPhoneNumber" />
                </dd>
              </dl>
            </div>
          </div>

          <div class="btn-wrap">
            <button type="button" class="btn-f-fill-main btn-save" @click="saveUserInfo()">저장</button>
          </div>
        </template>

        <template v-else>
          <div class="form">
            <div class="form-box">
              <dl class="form-item">
                <dt class="alert">
                  <i class="icon-info" />
                  <span class="txt">개인정보보호를 위해 본인확인을 진행하겠습니다.</span>
                </dt>
                <dd>
                  <input type="text" placeholder="비밀번호를 입력해 주세요." v-model="identityVerification" />
                </dd>
              </dl>
            </div>
          </div>

          <div class="btn-wrap">
            <button type="button" class="btn-f-fill-main btn-save" @click="confirmPassword()">본인 확인</button>
          </div>
        </template>
      </div>
    </div>
  </section>

  <BaseModal ref="modal">
    <template #default>
      <div class="alert">
        <i class="icon-check-circle" />
        <div class="txt">{{ modalMsg }}</div>
      </div>
    </template>

    <template #footer>
      <button
          type="button"
          class="btn-main"
          @click="modal.modalClose()"
      >
        확인
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { useLocalStorage } from "@vueuse/core";
import { ref, onMounted } from "vue";

const showChangePwd = ref(false);

const modal = ref();
const modalMsg = ref();

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

// 폼 데이터
const formData = ref({
  username: '',
  currentPassword: '',
  newPassword: '',
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
  email: ''
})

const token = useLocalStorage('token', '');

const fetchUserInfo = async () => {
  try {
    const response = await $fetch('/api/v1/members/me', {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response) {
      const [emailPrefix, emailDomain] = response.email.split('@');

      formData.value = {
        nickname: response.nickname,
        username: response.username,
        emailPrefix: emailPrefix,
        emailDomain: emailDomain,
        selectedDomain: ['naver.com', 'daum.net', 'kakao.net', 'gmail.com'].includes(emailDomain) ? emailDomain : '직접입력',
        phone: response.phone
      };
    }
  } catch (error) {
    console.error('에러', error);
  }
}

onMounted(()=> {
  fetchUserInfo();
});

const saveUserInfo = async () => {
  const { nickname, username, emailPrefix, emailDomain, phone } = formData.value;

  const formDataObj = {
    nickname,
    username,
    email: `${emailPrefix}@${emailDomain}`,
    phone
  };

  try {
    const response = await fetch('/api/v1/members/me', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      modalMsg.value = "개인정보 변경이 완료되었습니다.";
      modal.value.modalOpen();
    } else {
      modalMsg.value = "개인정보 변경이 실패했습니다.";
      modal.value.modalOpen();

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

  if (showChangePwd.value) {
    await changePassword();
  }
};

// 비밀번호 변경
const changePassword = async () => {
  const { currentPassword, newPassword, confirmPassword } = formData.value;

  const formDataObj = {
    currentPassword,
    newPassword,
    confirmPassword
  };

  try {
    const response = await fetch('/api/v1/members/password', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      modalMsg.value = "개인정보 변경이 완료되었습니다.";
      modal.value.modalOpen();

      showForm.value = false;
      identityVerification.value = '';
    } else {
      modalMsg.value = "개인정보 변경이 실패했습니다.";
      modal.value.modalOpen();

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
}

/* 회원 본인인증 */
const identityVerification = ref();
const showForm = ref(false);

const confirmPassword = async () => {
  const formDataObj = {
    currentPassword: identityVerification.value
  };

  try {
    const response = await fetch('/api/v1/members/password/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      modalMsg.value = "본인확인이 완료되었습니다.";
      modal.value.modalOpen();

      await init();

      showForm.value = true;
    } else {
      modalMsg.value = "본인확인이 실패했습니다.";
      modal.value.modalOpen();
      showForm.value = false;

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
/* END: 회원 본인인증 */

// 초기화
const init = async () => {
  showChangePwd.value = false;

  formData.value = {
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    nickname: '',
    emailPrefix: '',
    emailDomain: '',
    selectedDomain: '직접입력',
    phone: ''
  };

  await fetchUserInfo();
}

definePageMeta({
  layout: 'mypage'
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/mypage/info.scss');
</style>