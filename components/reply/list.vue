<template>
  <div>
    <ReplyItem
        v-for="reply in replies"
        :key="reply?.commentId"
        :reply="reply" />
  </div>
</template>

<script setup>
const props = defineProps({
  replies: {
    type: Array,
    required: true
  }
});
</script>