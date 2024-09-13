<template>
  <div>
    <div class="btn-wrap">
      <p class="title">고정된 게시판</p>

      <button
          type="button"
          class="btn-edit"
          @click="modal.modalOpen()"
          title="게시판 위치 편집"
      >
        게시판 위치 편집
      </button>
    </div>

    <draggable
        handle=".icon-more-vertical"
        tag="div"
        :list="pinnedBoards"
        class="drag-area"
        v-bind="dragOptions"
        v-if="pinnedBoards?.length > 0"
        @end="onEnd"
    >
      <template #item="{ element: item, index }">
        <div class="item">
          <div class="title">
            <span class="txt">
              <NuxtLink
                  :to="`/board/${ item?.boardId }`"
                  :title="item?.boardName"
              >
                {{ item?.boardName }}
              </NuxtLink>
            </span>

            <i class="icon-more-vertical" />
          </div>

          <div class="list">
            <div
                class="list-item"
                v-for="(post, postId) in item?.posts"
                :key="postId"
            >
              <NuxtLink
                  :to="`/post/${ post?.postId }?boardId=${item?.boardId}`"
                  :title="item?.TITLE"
              >
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
          <div v-for="(item, i) in withCheckedBoards" :key="i">
            <label class="checkbox-custom">
              <input
                  type="checkbox"
                  v-model="item.checked"
              />
              <span class="txt">{{ item?.boardName }}</span>
            </label>
          </div>

        </div>
      </template>

      <template #footer>
        <button
            type="button"
            class="btn-main"
            @click="modifyPinnedBoard()"
        >
          저장
        </button>
      </template>
    </BaseModal>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';
import { useLocalStorage } from '@vueuse/core';

const modal = ref();
const token = useLocalStorage('token', '');
const withCheckedBoards = ref();

// 전체 게시판 조회
const { data: boards, execute: exeBoards } = await useAsyncData('Boards',
  () => $fetch(`/api/v1/boards/with-pin`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  })
);

// 게시판 핀고정 및 해제
const { data: pinnedBoards, execute: exePinnedBoards } = await useAsyncData('pinnedBoards',
  () => $fetch(`/api/v1/boards/pinned`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  })
);

// 게시판 데이터 및 핀 데이터 조회
const loadBoardData = async () => {
  await exeBoards();
  await exePinnedBoards();

  withCheckedBoards.value = boards.value.map(board => ({
    ...board,
    checked: (board.pinnedBoardId !== 0)
  }))
}

onMounted(async () => {
  await loadBoardData();
});

// 드래그 옵션
const dragOptions = ref({
  animation: 200,
  group: 'description'
});

// 드래그 끝날 때 실행 이벤트
const onEnd = async () => {
  let orders = pinnedBoards.value.map(board => board.boardId);

  try {
    const response = await fetch('/api/v1/boards/pinned/reorder', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orders)
    });

    if (response.ok) {
      console.log("성공");
    } else {
      console.error("성공X: ", response.status, response.statusText);
      const errorData = await response.json();
      console.error("상세내용: ", errorData);
    }
  } catch (error) {
    console.error("에러: ", error);
  }
}

// 체크박스 상태 관리
const checkedBoards = ref();

const modifyPinnedBoard = async () => {
  checkedBoards.value = withCheckedBoards.value.filter(item => item.checked);

  try {
    const response = await fetch('/api/v1/boards/pinned', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkedBoards.value)
    });

    if (response.ok) {
      console.log("성공");
      modal.value.modalClose();
      await loadBoardData();
    } else {
      console.error("성공X: ", response.status, response.statusText);
      const errorData = await response.json();
      console.error("상세내용: ", errorData);
    }
  } catch (error) {
    console.error("에러: ", error);
  }
};
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/board.scss');
</style>