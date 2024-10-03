<template>
  <section class="full-width">
    <div class="section-title">게시판 요청</div>

    <div class="section-content">
      <div class="section-content-inner w-600">
        <form @submit.prevent="submitForm">
          <div class="form">
            <div class="form-box">
              <div class="form-item" :class="{'is-error': errorMessage.boardName}">
                <div class="form-alert">
                  <i class="icon-info" />
                  <span class="txt">게시판 요청 시, 최대 15일 내로 접수 안내 드리도록 하겠습니다.</span>
                </div>

                <label class="form-label">
                  <input
                      type="text"
                      placeholder="게시판 이름"
                      v-model="formData.boardName"
                      class="form-input"
                  />
                  <span class="form-txt" v-if="formData.boardName">게시판 이름</span>
                  <span class="form-border"></span>
                </label>
              </div>

              <div class="form-info" v-if="errorMessage.boardName">
                <span>{{ errorMessage.boardName }}</span>
              </div>
            </div>

            <div class="form-box">
              <div class="form-item" :class="{'is-error': errorMessage.desc}">
                <label class="form-label">
                  <input
                      type="text"
                      placeholder="게시판 설명"
                      v-model="formData.desc"
                      class="form-input"
                  />
                  <span class="form-txt" v-if="formData.desc">게시판 설명</span>
                  <span class="form-border"></span>
                </label>
              </div>

              <div class="form-info" v-if="errorMessage.desc">
                <span>{{ errorMessage.desc }}</span>
              </div>
            </div>
          </div>

          <div class="btn-wrap">
            <button
                type="submit"
                class="btn-f-fill-main btn-save"
                title="요청하기"
            >
              요청하기
            </button>
          </div>
        </form>
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
import {ref} from "vue";

const token = useLocalStorage('token', '');

const modal = ref();
const modalMsg = ref();

// 폼 데이터
const formData = ref({
  boardName: '',
  desc: ''
});

// 오류 메시지
const errorMessage = ref({
  boardName: '',
  desc: ''
})

// 초기화
const init = () => {
  formData.value = {
    boardName: '',
    desc: ''
  };
}

// 게시판 생성 요청
const submitForm = async () => {
  const { boardName, desc } = formData.value;

  const formDataObj = {
    boardName,
    desc
  };

  try {
    const response = await fetch('/api/v1/boards/requests', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      modalMsg.value = "게시판 요청이 완료되었습니다.";
      modal.value.modalOpen();

      await init();
    } else {
      modalMsg.value = "게시판 요청이 실패했습니다.";
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

definePageMeta({
  layout: 'mypage'
})
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/mypage/board/add.scss');
</style>