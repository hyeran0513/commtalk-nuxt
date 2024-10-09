<template>
  <div class="sidebar">
    <div class="sidebar-inner">
      <div class="profile">
        <div
            class="profile-img"
            v-if="profile?.fileUrl"
            :style="{background: `#f8f8f8 url(${ profile?.fileUrl }) no-repeat center/auto 100%`}"
        />

        <div v-else class="profile-default"></div>

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

      <div class="user-info">
        <p class="user-name">{{ userInfo?.username }}님</p>
        <p class="user-id">{{ userInfo?.nickname }}</p>
      </div>

      <div class="menu">
        <div
            v-for="(item, index) in menuItems"
            :key="index"
            class="menu-item"
        >
          <NuxtLink
              :to="item?.link"
              class="menu-title"
              @click="toggle(index)"
              :class="{'is-active': activeIndex === index}"
              v-if="!item.adminOnly || userInfoStore.admin"
          >
            {{ item?.title }}
          </NuxtLink>

          <transition name="slide">
            <div
                v-show="activeIndex === index"
                class="submenu"
            >
              <div
                  v-for="(subItem, subIndex) in item.submenu"
                  :key="subIndex"
                  class="submenu-item"
              >
                <NuxtLink
                    :to="subItem.link"
                    class="submenu-title"
                    @click="setActiveSubIndex(subIndex)"
                    :class="{'is-active': activeSubIndex === subIndex}"
                    v-if="!subItem.adminOnly || userInfoStore.admin"
                >
                  {{ subItem.title }}
                </NuxtLink>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useLocalStorage } from "@vueuse/core";
import { useUserInfoStore } from '@/stores/userInfo';
import { useRoute } from 'vue-router'; // vue-router 추가

const token = useLocalStorage('token', '');
const userInfoStore = useUserInfoStore();
const route = useRoute();

const menuItems = ref([
  {
    title: '마이페이지 홈',
    link: '/mypage'
  },
  {
    title: '개인정보 변경',
    link: '/mypage/info'
  },
  {
    title: '글',
    submenu: [
      {
        title: '내가 쓴 글',
        link: '/mypage/writing/post'
      },
      {
        title: '댓글 단 글',
        link: '/mypage/writing/comment'
      }
    ]
  },
  {
    title: '활동',
    submenu: [
      {
        title: '공감',
        link: '/mypage/activity/like'
      },
      {
        title: '스크랩',
        link: '/mypage/activity/scrap'
      },
    ]
  },
  {
    title: '게시판',
    submenu: [
      {
        title: '게시판 요청',
        link: '/mypage/board/add'
      },
      {
        title: '게시판 요청 목록',
        link: '/mypage/board/list'
      },
      {
        title: '게시판 목록 관리',
        link: '/mypage/board/manage',
        adminOnly: true
      }
    ]
  }
]);

const activeIndex = ref(0);
const activeSubIndex = ref();

const setActiveIndex = (path) => {
  menuItems.value.forEach((item, index) => {
    if (item.link === path) {
      activeIndex.value = index;
      activeSubIndex.value = -1; // 서브메뉴 초기화
    } else if (item.submenu) {
      item.submenu.forEach((subItem, subIndex) => {
        if (subItem.link === path) {
          activeIndex.value = index;
          activeSubIndex.value = subIndex;
        }
      });
    }
  });
};

watch(() => route.path, setActiveIndex);
onMounted(() => setActiveIndex(route.path));

const toggle = (index) => {
  activeSubIndex.value = '';
  activeIndex.value = activeIndex.value === index ? '' : index
}

const setActiveSubIndex = (subIndex) => {
  activeSubIndex.value = subIndex;
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
      await refreshProfile();
    } else {
      console.log('성공X');
    }
  } catch (error) {
    console.error('에러:', error);
  }
}
/* END: 회원 프로필 사진 업로드 */

// 회원 프로필 사진 조회
const { data: profile, execute: exeProfile, refresh: refreshProfile } = await useAsyncData('profile',
    () => $fetch(`/api/v1/files/profile`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

// 회원 정보 조회
const { data: userInfo, execute: exeUserInfo } = await useAsyncData('userInfo',
    () => $fetch(`/api/v1/members/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/side-bar.scss');
</style>
