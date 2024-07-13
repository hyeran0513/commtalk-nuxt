<template>
  <div>
    <CommentItem v-for="comment in comments" :key="comment?.commentId" :comment="comment" />
  </div>
</template>

<script setup>
const props = defineProps({
  postId: {
    type: String,
    required: true
  },
});

const { data: comments } = await useAsyncData('comments',
    () => $fetch(`/api/v1/posts/${props.postId}/comments`, {
      params: {
        postId: props.postId
      }
    })
);
</script>
