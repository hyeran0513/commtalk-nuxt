<template>
  <div class="comment-item reply">
    <div class="item">
      <div class="profile">
        <div class="profile-default"></div>
      </div>

      <div class="detail">
        <div class="flex-box">
          <div class="user-name">
            <template v-if="reply?.anonymousYN">익명</template>
            <template v-else>{{ reply?.writer?.nickname }}</template>
          </div>

          <div class="tooltip" ref="tooltipRef">
            <transition name="fade">
              <div class="tooltip-box" v-if="showActions">
                <ul class="tooltip-list">
                  <li class="item">
                    <button type="button" class="has-icon" @click="reportReply">
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
                    <button type="button" class="has-icon" @click="deleteReply()">
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
            <textarea v-model="reply.content" />

            <div class="checkbox-list">
              <label class="checkbox-custom">
                <input type="checkbox" v-model="reply.anonymousYN" />
                <span class="txt">익명</span>
              </label>
            </div>

            <div class="btn-wrap">
              <button type="button" class="btn-s-line-main" @click="showEditForm = false">취소</button>
              <button type="button" class="btn-s-fill-main" @click="editReply(reply.content, reply.anonymousYN)">수정</button>
            </div>
          </template>

          <template v-else>
            {{ reply?.content }}
          </template>
        </div>

        <div class="flex-box">
          <div class="date">{{ reply?.updatedAt }}</div>
        </div>
      </div>
    </div>
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
  reply: Object
})

const emits = defineEmits(['refreshComments']);

const refreshComments = () => {
  emits('refreshComments');
}

const showActions = ref(false)

const toggleActions = () => {
  showActions.value = !showActions.value
}

const editReply = async (content, anonymousYN) => {
  const body = {
    content,
    anonymousYN
  };

  try {
    const response = await fetch(`/api/v1/posts/${route.params.id}/comments/${props.reply.commentId}`, {
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

const deleteReply = async () => {
  try {
    const response = await fetch(`/api/v1/posts/${route.params.id}/comments/${props.reply.commentId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
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

const reportReply = () => {
  modal.value.modalOpen();
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>
