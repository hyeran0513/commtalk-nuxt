<template>
  <form @submit.prevent="submitForm">
    <div class="write-box">
      <textarea class="write-input" v-model="formData.content" placeholder="댓글을 작성해 주세요."></textarea>
      <div class="checkbox-list">
        <label class="checkbox-custom">
          <input type="checkbox" v-model="formData.anonymousYN" />
          <span class="txt">익명</span>
        </label>
      </div>
      <button class="write-btn" type="submit" @click="submitForm()">등록</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  postId: {
    type: String,
    required: true
  },
});

// 폼 데이터
const formData = ref({
  content: '',
  anonymousYN: ''
});

const submitForm = async () => {
  const { parentId, content, anonymousYN } = formData.value;
  const formDataObj = { parentId, content, anonymousYN };

  try {
    const response = await fetch(`/api/v1/posts/${props.postId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      console.log("성공");
    } else {
      console.log("성공X");
    }
  } catch (error) {
    console.error('에러:', error);
  }
};
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>