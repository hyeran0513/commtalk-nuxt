<template>
  <div class="comment-item">
    <div class="item">
      <div class="profile">
        <div class="profile-default"></div>
      </div>

      <div class="detail">
        <div class="flex-box">
          <div class="user-name">홍길동</div>
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
          {{ comment.content }}
        </div>

        <div class="flex-box">
          <div class="date">2024.06.22</div>
          <button type="button" class="btn-reply" @click="toggleReplyForm"><i class="icon-corner-down-right" />답글 쓰기</button>
        </div>
      </div>
    </div>

    <ReplyForm v-if="showReplyForm" />
    <ReplyList :replies="comment.replies" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onClickOutside } from "@vueuse/core";

const tooltipRef = ref();

onClickOutside(tooltipRef, event => {
  showActions.value = false;
});

const props = defineProps({
  comment: Object
})

const showActions = ref(false)
const showReplyForm = ref(false)

const toggleActions = () => {
  showActions.value = !showActions.value
}

const toggleReplyForm = () => {
  showReplyForm.value = !showReplyForm.value
}

const editComment = () => {
}

const deleteComment = () => {
}

const reportComment = () => {
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/comment.scss');
</style>
