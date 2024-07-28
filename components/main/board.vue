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
        :list="newLists"
        class="drag-area"
        v-bind="dragOptions"
        v-if="newLists?.length > 0"
        @end="onEnd"
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
          <div v-for="(item, i) in checkedBoards" :key="i">
            <label class="checkbox-custom">
              <input type="checkbox"
                     :checked="item.checked"
                     @change="changeCheckedBoards($event, item)"
              />
              <span class="txt">{{ item?.boardName }}</span>
            </label>
          </div>
        </div>
      </template>

      <template #footer>
        <button type="button" class="btn-main" @click="modifyPinnedBoard()">저장</button>
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

// 전체 게시판 목록과 고정된 게시판 목록을 가져오기
const { data: categoryData, execute: exeCategoryData } = await useAsyncData('categoryData',
    () => $fetch(`/api/v1/boards`)
);

const { data: pinnedBoards, execute: exePinnedBoards } = await useAsyncData('pinnedBoards',
    () => $fetch(`/api/v1/boards/pinned`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

// 핀고정 게시판 리스트에 order 추가
const addPinnedBoardOrder = () => {
  if (pinnedBoards.value) {
    newLists.value = pinnedBoards.value.map((item, index) => ({
      ...item,
      order: index
    }));
  }
}

const newLists = ref([]);
const checkedBoards = ref([]);

onMounted(async () => {
  await exeCategoryData();
  await exePinnedBoards();
  addPinnedBoardOrder();

  // 전체 게시판과 고정된 게시판을 비교하여 체크 상태 설정
  if (categoryData.value && pinnedBoards.value) {
    const pinnedBoardMap = new Map(pinnedBoards.value.map(board => [board.boardId, board.pinnedBoardId]));

    checkedBoards.value = categoryData.value.map(board => ({
      ...board,
      pinnedBoardId: pinnedBoardMap.get(board.boardId) || '',
      checked: pinnedBoardMap.has(board.boardId),
    }));
  }
});

// 드래그 옵션
const dragOptions = ref({
  animation: 200,
  group: 'description'
});

// 드래그 끝날 때 실행 이벤트
const onEnd = async () => {
  let orders = newLists.value.map(board => board.order);

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
      console.error("Error: ", response.status, response.statusText);
      const errorData = await response.json();
      console.error("Error details: ", errorData);
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

// 체크박스 상태 관리
const modifyPinnedBoard = async () => {
  const selectedBoards = checkedBoards.value
      .filter(board => board.checked)
      .map(board => ({
        pinnedBoardId: board.pinnedBoardId,
        boardId: board.boardId
      }));

  try {
    const response = await fetch(`/api/v1/boards/pinned`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedBoards)
    });

    if (response.ok) {
      modal.value.modalClose();
      await exePinnedBoards();
      addPinnedBoardOrder();
    } else {
      console.log("성공X");
    }
  } catch (error) {
    console.error('에러:', error);
  }
};

// 핀고정 및 해제 체크박스
const changeCheckedBoards = (event, item) => {
  const checked = event.target.checked;

  checkedBoards.value = checkedBoards.value.map(board =>
      board.boardId === item.boardId ? { ...board, checked } : board
  );
};
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/board.scss');
</style>