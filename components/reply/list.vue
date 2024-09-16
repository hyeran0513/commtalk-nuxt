<template>
  <div>
    <ReplyItem
        v-for="reply in replies"
        :key="reply?.commentId"
        :reply="reply"
        @refreshComments="$emit('refreshComments')"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  replies: {
    type: Array,
    required: true
  }
});

const emits = defineEmits(['refreshComments']);
</script>