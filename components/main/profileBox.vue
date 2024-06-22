<template>
  <div class="profile-box">
    <div class="top-area">
      <div class="profile">
        <div class="profile-img" v-if="userInfo.profile" :style="{background: `url(${ userInfo.PROFILE }) no-repeat center/auto 100%`}"></div>
        <div class="profile-default" v-else></div>

        <NuxtLink to="/info" class="btn-setting">
          <i class="icon-settings" />
        </NuxtLink>
      </div>

      <div class="user-info">
        <div class="user-name">{{ userInfo.USER_NAME }}님</div>
        <div class="user-id">{{ userInfo.USER_ID }}</div>
      </div>
    </div>

    <div class="btn-wrap">
      <button type="button" title="내 댓글">내 댓글</button>
      <button type="button" title="내 공감">내 공감</button>
      <button type="button" title="내 스크랩">내 스크랩</button>
    </div>
  </div>
</template>

<script setup>
  const userInfo = reactive({
    PROFILE: '',
    USER_NAME: '홍길동',
    USER_ID: '아이디'
  });
</script>

<style lang="scss" scoped>
  @import url('~/assets/scss/components/main/profile-box.scss');
</style>