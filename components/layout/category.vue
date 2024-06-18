<template>
  <div class="category">
    <transition name="slide-up">
      <div class="category-box" v-if="!isFold">
        <div class="category-box-inner">
          <div class="item" v-for="(category, categoryIdx) in categoryData" :key="categoryIdx">
            <div class="title">{{ category.title }}</div>
            
            <div class="list">
              <div class="list-item" v-for="(board, boardIdx) in category.boards" :key="boardIdx">
                <NuxtLink :to="`/board/${board.boardId}`" :title="board.boardName">
                  {{ board.boardName }}
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
      title: '일반',
      boards: [
        { boardName: '자유게시판', boardId: '1' },
        { boardName: '비밀게시판', boardId: '2' },
        { boardName: '정보게시판', boardId: '3' }
      ]
    },
    {
      title: '생활',
      boards: [
        { boardName: '여행', boardId: '1' },
        { boardName: '요리', boardId: '2' },
        { boardName: '알바 과외', boardId: '3' },
        { boardName: '자취', boardId: '4' },
        { boardName: '건강', boardId: '5' }
      ]
    }
  ]);
</script>

<style scoped>
@import url('~/assets/scss/components/layout/category.scss');
</style>