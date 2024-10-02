<template>
  <div class="category">
    <transition name="slide">
      <div class="category-box" v-if="!isFold">
        <div class="category-box-inner">
          <div class="list">
            <div
                class="list-item"
                v-for="(board, boardIdx) in categoryData"
                :key="boardIdx"
            >
              <NuxtLink
                  :to="`/board/${board?.boardId}`"
                  :title="board?.boardName"
              >
                {{ board?.boardName }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <button type="button" class="btn-fold" @click="isFold = !isFold">
      <i :class="{'icon-chevron-down': isFold, 'icon-chevron-up': !isFold}" />
    </button>
  </div>

  <div class="category mob-type">
    <div class="swiper-wrap">
      <button type="button" title="검색" class="search-btn" @click="showSearchBtn = !showSearchBtn">
        <template v-if="showSearchBtn">
          <i class="icon-close" />
        </template>

        <template v-else>
          <i class="icon-search" />
        </template>
      </button>

      <swiper
          :slidesPerView="'auto'"
          :spaceBetween="10"
          :observer="true"
          :observe-parents="true"
          :grabCursor="true"
      >
        <swiper-slide
            v-for="(board, boardIdx) in categoryData"
            :key="boardIdx"
        >
          <div class="item">
            <NuxtLink
                :to="`/board/${board?.boardId}`"
                :title="board?.boardName"
            >
              {{ board?.boardName }}
            </NuxtLink>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <transition name="fade">
      <LayoutSearch v-if="showSearchBtn" />
    </transition>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

const isFold = ref(false);

const { data: categoryData, execute: exeCategoryData } = await useAsyncData('categoryData',
    () => $fetch(`/api/v1/boards`)
);

onMounted(async () => {
  await exeCategoryData();
});

const showSearchBtn = ref(false);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/category.scss');
</style>