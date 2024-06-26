<template>
  <div class="category">
    <transition name="slide-up">
      <div class="category-box" v-if="!isFold">
        <div class="category-box-inner">
          <div class="list">
            <div class="list-item" v-for="(board, boardIdx) in categoryData" :key="boardIdx">
              <NuxtLink :to="`/board/${board.BOARD_ID}`" :title="board.BOARD_NAME">
                {{ board.BOARD_NAME }}
              </NuxtLink>
            </div>
            
            <button type="button" class="btn-add" @click="modal.modalOpen()">
              <i class="icon-plus" />
              <span class="txt">게시판 추가</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <button type="button" class="btn-fold" @click="isFold = !isFold">
      <i :class="{'icon-chevron-down': isFold, 'icon-chevron-up': !isFold}" />
    </button>
  </div>

  
  <BaseModal ref="modal" id="modal">
      <template #title>게시판 요청</template>

      <template #default>
        <div class="form">
          <div class="form-item">
            <dl class="form-box">
              <dt>게시판 이름</dt>
              <dd>
                <input type="text" placeholder="게시판 이름을 작성해 주세요." />
              </dd>
            </dl>
          </div>

          <div class="form-item">
            <dl class="form-box">
              <dt>게시판 설명</dt>
              <dd>
                <textarea class="textarea-custom" placeholder="게시판 설명을 작성해 주세요." />
              </dd>
            </dl>
          </div>
        </div>
      </template>

      <template #footer>
        <button type="button" class="btn-main" @click="modal.modalClose()">제출</button>
      </template>
    </BaseModal>
</template>

<script setup>
  const modal = ref();

  const isFold = ref(false);

  const categoryData = reactive([
    { BOARD_NAME: '자유게시판', BOARD_ID: '1' },
    { BOARD_NAME: '비밀게시판', BOARD_ID: '2' },
    { BOARD_NAME: '정보게시판', BOARD_ID: '3' },
    { BOARD_NAME: '여행', BOARD_ID: '4' },
    { BOARD_NAME: '요리', BOARD_ID: '5' },
    { BOARD_NAME: '알바 과외', BOARD_ID: '6' },
    { BOARD_NAME: '자취', BOARD_ID: '7' },
    { BOARD_NAME: '건강', BOARD_ID: '8' }
  ]);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/category.scss');
</style>