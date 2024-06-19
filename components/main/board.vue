<template>
  <div>
    <div class="btn-wrap">
      <button type="button" 
      class="btn-edit" 
        @click="modal.modalOpen('modal')">게시판 노출 위치 편집</button>
    </div>

    <draggable
      handle=".icon-more-vertical"
      tag="div"
      :list="list"
      class="drag-area"
      v-bind="dragOptions"
    >
      <template #item="{ element: item, index }">
        <div class="item">
          <div class="title">
            <span class="txt">
              <NuxtLink :to="`/board/${ item.BOARD_ID }`" :title="item.TITLE">{{ item.BOARD_NAME }}</NuxtLink>
            </span>

            <i class="icon-more-vertical" />
          </div>

          <div class="list">
            <div class="list-item" v-for="(item, i) in item.LIST" :key="i">
              <NuxtLink :to="`/post/${ item.POST_ID }`" :title="item.TITLE">
                <span class="title">{{ item.TITLE }}</span>
                <span class="comment-count">{{ item.COMMENT_COUNT }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <BaseModal ref="modal" id="modal">
      <template #title>게시판 노출 위치 편집</template>

      <template #default>
        <div class="info">
          <i class="icon-info" />
          <span>게시판 노출은 최대 6개까지 가능합니다.</span>
        </div>
        
        <div class="checkbox-list">
          <div v-for="(item, i) in list" :key="i">
            <label class="checkbox-custom">
              <input type="checkbox" />
              <span class="txt">{{ item.BOARD_NAME }}</span>
            </label>
          </div>
        </div>
      </template>

      <template #footer>
        <button type="button" class="btn-main" @click="modal.modalClose('modal')">저장</button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const modal = ref();

const list = reactive([
  { 
    ID: '1', 
    BOARD_NAME: '자유게시판', 
    BOARD_ID: '1',
    LIST: [
      {
        POST_ID: '1',
        TITLE: '제목1',
        COMMENT_COUNT: '10'
      },
      {
        POST_ID: '2',
        TITLE: '제목2',
        COMMENT_COUNT: '10'
      },
      {
        POST_ID: '3',
        TITLE: '제목3',
        COMMENT_COUNT: '10'
      }
    ]
  },
  { 
    ID: '2', 
    BOARD_NAME: '비밀게시판',
    BOARD_ID: '2',
    LIST: [
      {
        POST_ID: '1',
        TITLE: '제목1',
        COMMENT_COUNT: '10'
      },
      {
        POST_ID: '2',
        TITLE: '제목2',
        COMMENT_COUNT: '10'
      },
      {
        POST_ID: '3',
        TITLE: '제목3',
        COMMENT_COUNT: '10'
      }
    ]
  },
  { 
    ID: '3', 
    BOARD_NAME: '도도게시판', 
    BOARD_ID: '3',
    LIST: [
      {
        POST_ID: '1',
        TITLE: '제목1',
        COMMENT_COUNT: '10'
      },
      {
        POST_ID: '2',
        TITLE: '제목2',
        COMMENT_COUNT: '10'
      },
      {
        POST_ID: '3',
        TITLE: '제목3',
        COMMENT_COUNT: '10'
      }
    ]
  }
]);

const dragOptions = ref({
  animation: 200,
  group: 'description'
});
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/board.scss');
</style>