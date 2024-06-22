<template>
  <div>
    <ReplyItem v-for="reply in replies" :key="reply.id" :reply="reply" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  replies: Array
})
</script>