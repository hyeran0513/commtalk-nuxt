<template>
  <div>
    <CommentItem
        v-for="comment in comments"
        :key="comment?.commentId"
        :comment="comment"
        @refreshComments="$emit('refreshComments')"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});
</script>
