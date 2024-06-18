<template>
  <div class="category">
    <transition name="slide-up">
      <div class="category-box" v-if="!isFold">
        <div class="category-box-inner">
          <div class="item" v-for="(category, categoryIdx) in categoryData" :key="categoryIdx">
            <div class="title">{{ category.TITLE }}</div>
            
            <div class="list">
              <div class="list-item" v-for="(board, boardIdx) in category.BOARDS" :key="boardIdx">
                <NuxtLink :to="`/board/${board.BOARD_ID}`" :title="board.BOARD_NAME">
                  {{ board.BOARD_NAME }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <button type="button" class="btn-fold" @click="isFold = !isFold">
      <i :class="{'icon-chevron-down': isFold, 'icon-chevron-up': !isFold}" />
    </button>
  </div>
</template>

<script setup>
  const isFold = ref(false);

  const categoryData = reactive([
    {
      TITLE: '일반',
      BOARDS: [
        { BOARD_NAME: '자유게시판', BOARD_ID: '1' },
        { BOARD_NAME: '비밀게시판', BOARD_ID: '2' },
        { BOARD_NAME: '정보게시판', BOARD_ID: '3' }
      ]
    },
    {
      TITLE: '생활',
      BOARDS: [
        { BOARD_NAME: '여행', BOARD_ID: '1' },
        { BOARD_NAME: '요리', BOARD_ID: '2' },
        { BOARD_NAME: '알바 과외', BOARD_ID: '3' },
        { BOARD_NAME: '자취', BOARD_ID: '4' },
        { BOARD_NAME: '건강', BOARD_ID: '5' }
      ]
    }
  ]);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/category.scss');
</style>