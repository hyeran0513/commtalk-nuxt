<template>
  <div class="sidebar">
    <div class="logo-wrap">
      <NuxtLink to="/" class="logo"></NuxtLink>
    </div>

    <div class="menu">
      <div v-for="(item, index) in menuItems" :key="index" class="menu-item">
        <button type="button" class="menu-title" @click="toggle(index)">
          {{ item.title }}
        </button>

        <div v-show="activeIndex === index" class="submenu">
          <div v-for="(subItem, subIndex) in item.submenu" :key="subIndex" class="submenu-item">
           <button type="button">{{ subItem }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const menuItems = ref([
  { title: '개인정보 변경', submenu: [] },
  { title: '글', submenu: ['내가 쓴 글', '댓글 단 글'] },
  { title: '활동', submenu: ['공감', '스크랩', '신고'] }
])

const activeIndex = ref(null)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/side-bar.scss');
</style>
