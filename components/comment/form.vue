<template>
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
</template>

<script setup>
import { ref } from 'vue'
import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage('token', '');

const props = defineProps({
  postId: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: false
  }
});

const emit = defineEmits(['refreshComments']);

// 폼 데이터
const formData = ref({
  parentId: props.parentId || 0,
  content: '',
  anonymousYN: false
});

const submitForm = async () => {
  const { parentId, content, anonymousYN } = formData.value;
  const formDataObj = { parentId, content, anonymousYN };

  try {
    const response = await fetch(`/api/v1/posts/${props.postId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataObj)
    });

    if (response.ok) {
      emit('refreshComments');
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