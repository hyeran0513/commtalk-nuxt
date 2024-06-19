<template>
  <div>
    <div class="list">
      <div class="title">실시간 인기글</div>

      <div class="list-item" v-for="(item, i) in data" :key="i">
        <div class="num">{{ item.ID }}</div>

        <div class="info">
          <div class="title">
            <NuxtLink :to="`/post/${ item.POST_ID }`">
              <span class="txt">{{ item.BOARD_TITLE }}</span>
            </NuxtLink>
            
            <span class="count-comment">[{{ item.COUNT.COMMENT }}]</span>
          </div>

          <div class="detail">
            <div class="board-name">{{ item.BOARD_NAME }}</div>

            <div class="count">
              <span class="count-view">{{ item.COUNT.VIEW }}</span>
              <span class="count-like">{{ item.COUNT.LIKE }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive } from 'vue';

  const data = reactive([
    {
      ID: '1',
      BOARD_NAME: '자유게시판',
      BOARD_TITLE: '제목01',
      COUNT: {
        COMMENT: '10',
        VIEW: '10',
        LIKE: '10'
      }
    },
    {
      ID: '2',
      BOARD_NAME: '비밀게시판',
      BOARD_TITLE: '제목01',
      COUNT: {
        COMMENT: '10',
        VIEW: '10',
        LIKE: '10'
      }
    },
    {
      ID: '3',
      BOARD_NAME: '비밀게시판',
      BOARD_TITLE: '제목01',
      COUNT: {
        COMMENT: '10',
        VIEW: '10',
        LIKE: '10'
      }
    }
  ]);
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/popular.scss');
</style>