<template>
  <form @submit.prevent="submitComment">
    <div class="write-box">
      <textarea class="write-input" v-model="content" placeholder="댓글을 작성해 주세요."></textarea>
      <button class="write-btn" type="submit">등록</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')

const submitComment = () => {
  // console.log(content.value)
  content.value = ''
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>