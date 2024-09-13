<template>
  <div class="mobile-nav">
    <div class="top">
      <button
          type="button"
          class="btn-close"
          @click="mobNavClose"
          title="닫기"
      >
        <i class="icon-close" />
      </button>
    </div>

    <!-- 로그인일 경우 -->
    <template v-if="isLogin">
      <div class="info">
        <div class="info-box">
          <div class="profile">
            <div
                class="profile-img"
                v-if="profile?.fileUrl"
                :style="{background: `url(${ profile?.fileUrl }) no-repeat center/auto 100%`}"
            />

            <div class="profile-default" v-else />
          </div>

          <p class="name">{{ userInfo?.username }}님</p>

          <div class="btn-wrap">
            <button
                type="button"
                class="logout-btn"
                title="로그아웃"
                @click="[mobNavClose(), logout()]"
            >
              로그아웃
            </button>

            <NuxtLink
                to="/mypage"
                class="mypage-btn"
                title="마이페이지"
                v-if="token"
                @click="mobNavClose"
            >
              마이페이지
            </NuxtLink>
          </div>
        </div>
      </div>
    </template>
    <!-- // 로그인일 경우 -->

    <!-- 비로그인일 경우 -->
    <template v-else>
      <div class="info">
        <div class="info-box">
          <p class="name">로그인이 필요한 서비스입니다.</p>

          <div class="btn-wrap">
            <template
                v-for="(gnb, gnbIdx) in gnbList"
                :key="gnbIdx"
            >
              <NuxtLink
                  :to="gnb?.link"
                  :title="gnb?.txt"
                  :class="`${gnb?.value}-btn`"
                  @click="mobNavClose"
              >
                {{ gnb?.txt }}
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </template>

    <div class="scroll-area">
      <ul class="menu">
        <li class="menu-item" v-for="(menu, menuIdx) in menuList">
          <NuxtLink
              :to="menu?.link"
              @click="mobNavClose"
          >
            <span class="icon">
              <i :class="`icon-${menu?.icon}`" />
            </span>

            <span class="txt">{{ menu?.title }}</span>
          </NuxtLink>
        </li>
      </ul>

      <ul class="gnb">
        <li class="gnb-item" v-for="(board, boardIdx) in categoryData">
          <NuxtLink
              :to="`/board/${board?.boardId}`"
              :title="board?.boardName"
              @click="mobNavClose"
          >
            {{ board?.boardName }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();

const token = useLocalStorage('token', '');
const emit = defineEmits(['mobNavMove']);

// 로그인 여부
const isLogin = computed(() => {
  return !!token.value;
});

// 로그아웃
const logout = () => {
  token.value = '';
  router.push('/login');
};

// gnb
const gnbList = ref([
  { txt: '로그인', link: '/login', value: 'login' },
  { txt: '회원가입', link: '/join', value: 'join' }
]);

// 모바일 nav 닫힘
const mobNavClose = () => {
  emit('mobNavMove', 'close');
}

// 회원 정보 조회
const { data: userInfo, execute: exeUserInfo } = await useAsyncData('userInfo',
    () => $fetch(`/api/v1/members/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

// 회원 프로필 사진 조회
const { data: profile, execute: exeProfile } = await useAsyncData('profile',
    () => $fetch(`/api/v1/files/profile`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);

// 카테고리 조회
const { data: categoryData, execute: exeCategoryData } = await useAsyncData('categoryData',
    () => $fetch(`/api/v1/boards`)
);

onMounted(async () => {
  await exeUserInfo();
  await exeProfile();
  await exeCategoryData();
});

// 메뉴
const menuList = ref([
  {
    title: '내가 쓴 글',
    link: '/writing/post',
    icon: 'edit-3'
  },
  {
    title: '댓글 단 글',
    link: '/writing/comment',
    icon: 'message-square'
  },
  {
    title: '공감',
    link: '/activity/like',
    icon: 'outline-like'
  },
  {
    title: '스크랩',
    link: '/activity/scrap',
    icon: 'outline-star'
  }
]);
</script>