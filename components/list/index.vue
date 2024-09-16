<template>
  <div>
    <div class="list">
      <div
          class="list-item"
          v-for="(item, i) in data?.posts"
          :key="i"
      >
        <NuxtLink :to="`/post/${item?.postId}?boardId=${item?.board?.boardId}`">
          <div class="board-name">{{ item?.board?.boardName }}</div>
          <div class="title">{{ item?.title }}</div>
          <div class="content">{{ item?.previewContent }}</div>

          <div class="bottom-area">
            <div class="count">
              <span class="count-comment">{{ item?.commentCnt }}</span>
              <span class="count-view">{{ item?.viewCnt }}</span>
              <span class="count-like">{{ item?.likeCnt }}</span>
            </div>

            <div class="user-info">
              <div class="user-profile">
                <div
                    class="user-profile-img"
                    v-if="item?.USER_INFO?.USER_PROFILE"
                />

                <div class="user-profile-default"></div>
              </div>

              <div class="user-name">{{ item?.authorName }}</div>

              <div class="date">{{ item?.updatedAt }}</div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

    <div class="pagination" v-if="hasPagination">
      <button
          type="button"
          class="btn-prev"
          v-if="data?.pageNumber > 0"
          @click="loadPage(data?.pageNumber - 1)"
      >
        <i class="icon-chevron-left" />
      </button>

      <button
          type="button"
          class="page"
          v-for="page in data?.totalPages"
          :key="page - 1"
          :class="{ 'is-active': page - 1 === data?.pageNumber }"
          @click="loadPage(page - 1)"
      >
        {{ page }}
      </button>

      <button
          type="button"
          class="btn-next"
          v-if="data?.pageNumber + 1 < data?.totalPages"
          @click="loadPage(data?.pageNumber + 1)"
      >
        <i class="icon-chevron-right" />
      </button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['data', 'hasPagination']);
  const emits = defineEmits(['load-page']);

  const loadPage = async (num) => {
    emits('load-page', num);
  };
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/list.scss');
</style>