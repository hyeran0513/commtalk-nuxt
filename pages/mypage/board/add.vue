<template>
  <section class="full-width">
    <div class="section-title">게시판 요청</div>

    <div class="section-content">
      <div class="section-content-inner w-600">
        <form @submit.prevent="submitForm">
          <div class="form">
            <div class="form-box">
              <dl class="form-item">
                <dt>게시판 이름</dt>
                <dd>
                  <input
                      type="text"
                      placeholder="게시판 이름을 작성해 주세요."
                      v-model="formData.boardName"
                  />
                </dd>
              </dl>
            </div>

            <div class="form-box">
              <dl class="form-item">
                <dt>게시판 설명</dt>
                <dd>
                  <textarea
                      class="textarea-custom"
                      placeholder="게시판 설명을 작성해 주세요."
                      v-model="formData.desc"
                  />
                </dd>
              </dl>
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
          console.log(message[key]);
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