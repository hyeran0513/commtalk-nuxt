<template>
  <div>
    <div class="btn-wrap">
      <button type="button" 
      class="btn-edit" 
        @click="modal.modalOpen()">게시판 노출 위치 편집</button>
    </div>

    <draggable
      handle=".icon-more-vertical"
      tag="div"
      :list="list"
      class="drag-area"
      v-bind="dragOptions"
      v-if="list?.length > 0"
    >
      <template #item="{ element: item, index }">
        <div class="item">
          <div class="title">
            <span class="txt">
              <NuxtLink :to="`/board/${ item?.boardId }`" :title="item?.boardName">{{ item?.boardName }}</NuxtLink>
            </span>

            <i class="icon-more-vertical" />
          </div>

          <div class="list">
            <div class="list-item" v-for="(post, postId) in item?.posts" :key="postId">
              <NuxtLink :to="`/post/${ post?.postId }`" :title="item?.TITLE">
                <span class="title">{{ post?.title }}</span>
                <span class="comment-count">{{ post?.commentCnt }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </draggable>

    <template v-else>
      <BaseNodata text="고정된 게시판이 없습니다." />
    </template>

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
              <span class="txt">{{ item?.boardName }}</span>
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
import { useLocalStorage } from '@vueuse/core';

const modal = ref();

const token = useLocalStorage('token', '');

const { data: list } = await useAsyncData('list',
  () => $fetch(`/api/v1/boards/pinned`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  })
);

const dragOptions = ref({
  animation: 200,
  group: 'description'
});
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/board.scss');
</style>