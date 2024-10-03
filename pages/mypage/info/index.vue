<template>
  <section class="full-width">
    <div class="section-title">개인정보 변경</div>

    <div class="section-content">
      <div class="section-content-inner w-600">
        <template v-if="showForm">
          <div class="form">
            <div class="form-box">
              <div class="form-item" :class="{'is-error': errorMessage.nickname}">
                <label class="form-label">
                  <input
                      type="text"
                      placeholder="아이디"
                      v-model="formData.nickname"
                      class="form-input"
                      disabled
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
              <div class="form-item">
                <button
                    type="button"
                    class="btn-s-fill-main"
                    @click="showChangePwd = !showChangePwd"
                >
                  비밀번호 변경
                </button>
              </div>
            </div>

            <div class="form-box" v-show="showChangePwd">
              <div class="form-item" :class="{'is-error': errorMessage.currentPassword}">
                <label class="form-label">
                  <input
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="기존 비밀번호"
                      v-model="formData.currentPassword"
                      class="form-input"
                  />
                  <span class="form-txt" v-if="formData.currentPassword">기존 비밀번호</span>
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

              <div class="form-info" v-if="errorMessage.currentPassword">
                <span>{{ errorMessage.currentPassword }}</span>
              </div>
            </div>

            <div class="form-box" v-show="showChangePwd">
              <div class="form-item" :class="{'is-error': errorMessage.newPassword}">
                <label class="form-label">
                  <input
                      :type="showNewPassword ? 'text' : 'password'"
                      placeholder="새 비밀번호"
                      v-model="formData.newPassword"
                      class="form-input"
                  />
                  <span class="form-txt" v-if="formData.newPassword">새 비밀번호</span>
                  <span class="form-border"></span>

                  <button
                      type="button"
                      class="btn-show-password"
                      @click="showNewPassword = !showNewPassword"
                      :title="showNewPassword ? '비밀번호 숨기기' : '비밀번호 보기'"
                  >
                    <i :class="showNewPassword ? 'icon-eye' : 'icon-eye-off'" />
                  </button>
                </label>
              </div>

              <div class="form-info" v-if="errorMessage.newPassword">
                <span>{{ errorMessage.newPassword }}</span>
              </div>
            </div>

            <div class="form-box" v-show="showChangePwd">
              <div class="form-item" :class="{'is-error': errorMessage.confirmPassword}">
                <label class="form-label">
                  <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      placeholder="새 비밀번호 확인"
                      v-model="formData.confirmPassword"
                      class="form-input"
                  />
                  <span class="form-txt" v-if="formData.confirmPassword">새 비밀번호 확인</span>
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

          <div class="btn-wrap">
            <button
                type="button"
                class="btn-f-fill-main btn-save"
                @click="saveUserInfo()"
                title="저장"
            >
              저장
            </button>
          </div>
        </template>

        <template v-else>
          <div class="form">
            <div class="form-box">
              <div class="form-item">
                <div class="form-alert">
                  <i class="icon-info" />
                  <span class="txt">개인정보보호를 위해 본인확인을 진행하겠습니다.</span>
                </div>

                <label class="form-label">
                  <input
                      :type="showIdentityVerification ? 'text' : 'password'"
                      placeholder="비밀번호"
                      v-model="identityVerification"
                      class="form-input"
                  />
                  <span class="form-txt" v-if="identityVerification">비밀번호</span>
                  <span class="form-border"></span>

                  <button
                      type="button"
                      class="btn-show-password"
                      @click="showIdentityVerification = !showIdentityVerification"
                      :title="showIdentityVerification ? '비밀번호 숨기기' : '비밀번호 보기'"
                  >
                    <i :class="showIdentityVerification ? 'icon-eye' : 'icon-eye-off'" />
                  </button>
                </label>
              </div>
            </div>
          </div>

          <div class="btn-wrap">
            <button
                type="button"
                class="btn-f-fill-main btn-save"
                @click="confirmPassword()"
                title="본인 확인"
            >
              본인 확인
            </button>
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
          title="확인"
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

const showIdentityVerification = ref(false);
const showPassword = ref(false);
const showNewPassword = ref(false);
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

// 폼 데이터
const formData = ref({
  username: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  nickname: '',
  email: '',
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
      formData.value = {
        nickname: response.nickname,
        username: response.username,
        email: response.email,
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
  const { nickname, username, email, phone } = formData.value;

  const formDataObj = {
    nickname,
    username,
    email,
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

/* 비밀번호 일치 확인 */
const validatePasswords = () => {
  errorMessage.value.newPassword = (formData.value.newPassword && formData.value.confirmPassword && formData.value.newPassword !== formData.value.confirmPassword)
      ? '비밀번호가 일치하지 않습니다.'
      : '';
};

watch(() => formData.value.newPassword,
    validatePasswords
);

watch(() => formData.value.confirmPassword,
    validatePasswords
);
/* END: 비밀번호 일치 확인 */

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
    email: '',
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