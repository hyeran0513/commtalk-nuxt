<template>
  <div class="sidebar">
    <div class="logo-wrap">
      <NuxtLink to="/" class="logo"></NuxtLink>
    </div>

    <div class="profile">
      <div class="profile-img" :style="{background: `#f8f8f8 url(${ profile?.fileUrl }) no-repeat center/auto 100%`}"></div>

      <button
          type="button"
          class="btn-setting"
          @click.prevent="triggerFileInput"
      >
        <i class="icon-settings" />
      </button>

      <input
          type="file"
          ref="fileInput"
          style="display: none"
          @change="uploadProfile"
      />
    </div>

    <div class="menu">
      <div v-for="(item, index) in menuItems" :key="index" class="menu-item">
        <NuxtLink :to="item.link"
                  class="menu-title"
                  @click="toggle(index)"
                  :class="{'is-active': activeIndex === index}">
          {{ item.title }}
        </NuxtLink>

        <div v-show="activeIndex === index" class="submenu">
          <div v-for="(subItem, subIndex) in item.submenu" :key="subIndex" class="submenu-item">
           <NuxtLink :to="subItem.link"
                      class="submenu-title">{{ subItem.title }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useLocalStorage } from "@vueuse/core";

const token = useLocalStorage('token', '');

const menuItems = ref([
{
    title: '마이페이지 홈',
    link: '/mypage'
  },
  {
    title: '개인정보 변경',
    link: '/info'
  },
  {
    title: '글',
    submenu: [
      {
        title: '내가 쓴 글',
        link: '/writing/post'
      },
      {
        title: '댓글 단 글',
        link: '/writing/comment'
      }
    ]
  },
  {
    title: '활동',
    submenu: [
        {
          title: '공감',
          link: '/activity/like'
        },
        {
          title: '스크랩',
          link: '/activity/scrap'
        },
        {
          title: '신고',
          link: '/activity/report'
        }
      ]
    }
])

const activeIndex = ref(null)

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

/* 회원 프로필 사진 업로드 */
const fileInput = ref();

const triggerFileInput = () => {
  fileInput.value.click();
}

const uploadProfile = async (event) => {
  const fileData = event.target.files[0];

  if (!fileData) return;

  const formData = new FormData();
  formData.append('file', fileData);

  try {
    const response = await fetch(`/api/v1/files/profile`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: formData,
    });

    if (response.ok) {
      console.log('성공');
      const result = await response.json();
      console.log(result);
    } else {
      console.log('성공X');
    }
  } catch (error) {
    console.error('에러:', error);
  }
}
/* END: 회원 프로필 사진 업로드 */

// 회원 프로필 사진 조회
const { data: profile, execute: exeProfile } = await useAsyncData('profile',
  () => $fetch(`/api/v1/files/profile`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    }
  })
);

onMounted(() => {
  exeProfile();
})
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/side-bar.scss');
</style>
