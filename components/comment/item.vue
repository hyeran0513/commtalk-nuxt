<template>
  <div class="comment-item">
    <div class="item">
      <div class="profile">
        <div class="profile-default"></div>
      </div>

      <div class="detail">
        <div class="flex-box">
          <div class="user-name">{{ comment?.writer?.nickname }}</div>
          <div class="tooltip" ref="tooltipRef">
            <transition name="fade">
              <div class="tooltip-box" v-if="showActions">
                <ul class="tooltip-list">
                  <li class="item">
                    <button type="button" class="has-icon" @click="reportComment">
                      <i class="icon-alert-triangle" />
                      <span class="txt">신고</span>
                    </button>
                  </li>

                  <li class="item">
                    <button type="button" class="has-icon" @click="editComment">
                      <i class="icon-edit" />
                      <span class="txt">수정</span>
                    </button>
                  </li>
                  
                  <li class="item">
                    <button type="button" class="has-icon" @click="deleteComment">
                      <i class="icon-trash-2" />
                      <span class="txt">삭제</span>
                    </button>
                  </li>
                </ul>
              </div>
            </transition>

            <button type="button" class="btn-dots tooltip-btn" @click="toggleActions"><span class="icon-more-vertical" /></button>
          </div>
        </div>

        <div class="content">
          <template v-if="showEditForm">
            <textarea v-html="comment?.content" />

            <div class="btn-wrap">
              <button type="button" class="btn-s-line-main" @click="showEditForm = false">취소</button>
              <button type="button" class="btn-s-fill-main">수정</button>
            </div>
          </template>

          <template v-else>
            {{ comment?.content }}
          </template>
        </div>

        <div class="flex-box">
          <div class="date">{{ comment?.updatedAt }}</div>
          <button type="button" class="btn-reply" @click="toggleReplyForm"><i class="icon-corner-down-right" />답글 쓰기</button>
        </div>
      </div>
    </div>

    <CommentForm v-if="showReplyForm" :parentId="comment?.commentId" :postId="route.params.id" @refreshComments="$emit('refreshComments')" />
    <ReplyList :replies="comment?.children" :postId="route.params.id" />
  </div>

  <BaseModal ref="modal" id="modal">
    <template #title>신고 요청</template>

    <template #default>
      <textarea class="textarea-custom" placeholder="신고 요청 내용을 입력해 주세요." />
    </template>

    <template #footer>
      <button type="button" class="btn-main" @click="modal.modalClose()">제출</button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from "@vueuse/core";
const route = useRoute();

const modal = ref();

const tooltipRef = ref();

onClickOutside(tooltipRef, event => {
  showActions.value = false;
});

const showEditForm = ref(false);

const props = defineProps({
  comment: Object
});

const showActions = ref(false)
const showReplyForm = ref(false)

const toggleActions = () => {
  showActions.value = !showActions.value
}

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value
}

const editComment = () => {
  showEditForm.value = true;
}

const deleteComment = () => {
}

const reportComment = () => {
  modal.value.modalOpen();
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>
