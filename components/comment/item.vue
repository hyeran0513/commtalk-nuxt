<template>
  <div class="comment-item">
    <div class="item">
      <div class="profile">
        <div class="profile-default"></div>
      </div>

      <div class="detail">
        <div class="flex-box">
          <div class="user-name">
            <template v-if="comment?.anonymousYN">익명</template>
            <template v-else>{{ comment?.writer?.nickname }}</template>
          </div>

          <button
              type="button"
              class="btn-like"
              :class="{'is-active': comment?.likeYN}"
              @click="handleLike"
          >
            좋아요 {{ comment?.likeCount }}
          </button>

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
                    <button type="button" class="has-icon" @click="showEditForm = true">
                      <i class="icon-edit" />
                      <span class="txt">수정</span>
                    </button>
                  </li>
                  
                  <li class="item">
                    <button type="button" class="has-icon" @click="deleteComment()">
                      <i class="icon-trash-2" />
                      <span class="txt">삭제</span>
                    </button>
                  </li>
                </ul>
              </div>
            </transition>

            <button
                type="button"
                class="btn-dots tooltip-btn"
                @click="toggleActions">
              <span class="icon-more-vertical" />
            </button>
          </div>
        </div>

        <div class="content">
          <template v-if="showEditForm">
            <textarea v-model="comment.content" />

            <div class="checkbox-list">
              <label class="checkbox-custom">
                <input type="checkbox" v-model="comment.anonymousYN" />
                <span class="txt">익명</span>
              </label>
            </div>

            <div class="btn-wrap">
              <button type="button" class="btn-s-line-main" @click="closeEditComment()">취소</button>
              <button type="button" class="btn-s-fill-main" @click="editComment(comment.content, comment.anonymousYN)">수정</button>
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

    <CommentForm v-if="showReplyForm"
                 :parentId="comment?.commentId"
                 :postId="route.params.id"
                 @refreshComments="$emit('refreshComments')"
                 @closeForm="showReplyForm = false" />
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
import {onClickOutside, useLocalStorage} from "@vueuse/core";
const route = useRoute();

const token = useLocalStorage('token', '');

const modal = ref();

const tooltipRef = ref();

onClickOutside(tooltipRef, event => {
  showActions.value = false;
});

const showEditForm = ref(false);

const props = defineProps({
  comment: Object
});

const emits = defineEmits(['refreshComments']);

const refreshComments = () => {
  emits('refreshComments');
}

const showActions = ref(false)
const showReplyForm = ref(false)

const toggleActions = () => {
  showActions.value = !showActions.value
}

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value
}

const closeEditComment = () => {
  refreshComments();
  showEditForm.value = false;
}

const editComment = async (content, anonymousYN) => {
  const body = {
    content,
    anonymousYN
  };

  try {
    const response = await fetch(`/api/v1/posts/${route.params.id}/comments/${props.comment.commentId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.ok) {
      refreshComments();
      console.log("성공");
      showEditForm.value = false;
    } else {
      console.error("Error: ", response.status, response.statusText);
      const errorData = await response.json();
      console.error("Error details: ", errorData);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const deleteComment = async () => {
  try {
    const response = await fetch(`/api/v1/posts/${route.params.id}/comments/${props.comment.commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      refreshComments();
      console.log("성공");
    } else {
      console.error("Error: ", response.status, response.statusText);
      const errorData = await response.json();
      console.error("Error details: ", errorData);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

const reportComment = () => {
  modal.value.modalOpen();
}

// 게시글 댓글 좋아요
const handleLike = async () => {
  try {
    const response = await fetch(`/api/v1/posts/${route.params.id}/comments/${props.comment.commentId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log("성공");
      refreshComments();
    } else {
      console.log("성공X");
    }
  } catch (error) {
    console.error('에러:', error);
  }
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>
