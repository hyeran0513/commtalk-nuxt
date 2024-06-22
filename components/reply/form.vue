<template>
  <form @submit.prevent="submitReply">
    <div class="write-box">
      <textarea class="write-input" v-model="content" placeholder="답글을 입력하세요"></textarea>
      <button type="submit" class="write-btn">등록</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const content = ref('')

const submitReply = () => {
  // console.log(content.value)
  content.value = ''
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>