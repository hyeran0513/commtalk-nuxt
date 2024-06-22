<template>
  <div>
    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const comments = ref([
  {
    id: 1,
    content: '댓글 내용 1',
    replies: [
      { id: 1, content: '답글 내용 1' },
      { id: 2, content: '답글 내용 2' },
    ]
  },
  {
    id: 2,
    content: '댓글 내용 2',
    replies: []
  }
])
</script>
