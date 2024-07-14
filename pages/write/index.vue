<template>
  <div class="write">
    <div class="form">
      <div class="form-item">
        <dl class="form-box">
          <dt>게시판</dt>
          <dd>
            <select v-model="formData.boardId">
              <option v-for="category in categoryData" :key="category.boardId" :value="category.boardId">
                {{ category.boardName }}
              </option>
            </select>
          </dd>
        </dl>
      </div>

      <div class="form-item">
        <dl class="form-box">
          <dt>제목</dt>
          <dd>
            <input type="text" placeholder="제목을 입력해 주세요." v-model="formData.title" />
          </dd>
        </dl>
      </div>

      <div class="form-item">
        <dl class="form-box">
          <dt>내용</dt>
          <dd>
            <BaseEditor v-model="formData.content" @get-editor="getEditor" :defaultValue="defaultValue" />
          </dd>
        </dl>
      </div>

      <div class="form-item">
        <dl class="form-box">
          <dt>익명 여부</dt>
          <dd>
            <div class="checkbox-list">
              <label class="checkbox-custom">
                <input type="checkbox" v-model="formData.anonymousYN" />
                <span class="txt">익명</span>
              </label>
            </div>
          </dd>
        </dl>
      </div>

      <div class="form-item">
        <dl class="form-box">
          <dt>댓글 허용</dt>
          <dd>
            <div class="checkbox-list">
              <label class="checkbox-custom">
                <input type="checkbox" v-model="formData.commentableYN" />
                <span class="txt">댓글 허용</span>
              </label>
            </div>
          </dd>
        </dl>
      </div>
    </div>

    <div class="btn-wrap">
      <NuxtLink to="/board/1" class="btn-s-line-main" @click="router.go(-1);">취소</NuxtLink>
      <button class="btn-s-fill-main" @click="submitForm()">완료</button>
    </div>
  </div>

  <BaseModal ref="modal">
    <template #default>
      <div class="alert">
        <i class="icon-check-circle" />
        <div class="txt">게시물이 등록되었습니다.</div>
      </div>
    </template>

    <template #footer>
      <button type="button" class="btn-main" @click="alertModalClose()">확인</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue';
import {useLocalStorage} from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const token = useLocalStorage('token', '');

const defaultValue = ref('내용');

let editor = null;
const getEditor = (_editor) => {
  editor = _editor;
};

const modal = ref();

const alertModalClose = () => {
  modal.value.modalClose();
  router.go(-1);
}

const formData = ref({
  boardId: route.query.boardId,
  title: '',
  content: '',
  anonymousYN: false,
  commentableYN: false,
  hashtags: []
});

const submitForm = async () => {
  const {title, content, anonymousYN, commentableYN, hashtags, boardId} = formData.value;

  const formDataObj = {
    title,
    content,
    anonymousYN,
    commentableYN,
    hashtags
  };

  try {
    const response = await fetch(`/api/v1/boards/${boardId}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      modal.value.modalOpen();
    } else {
      const errorData = await response.json();
      const {code, message} = errorData;

      if (code === 'BAD_REQUEST') {
        console.log(message);
      }
    }
  } catch (error) {
    console.error('에러:', error);
  }
};

const { data: categoryData } = await useAsyncData('categoryData', async () => {
  const response = await fetch(`/api/v1/boards`);
  return response.json();
});
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/write.scss');
</style>
