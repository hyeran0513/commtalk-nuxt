<template>
  <div class="sub-header">
    <div class="sub-header-inner">
      <ul class="gnb">
        <li class="gnb-item">
          <NuxtLink to="/login" title="로그인">로그인</NuxtLink>
        </li>
        
        <li class="gnb-item">
          <NuxtLink to="/join" title="회원가입">회원가입</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/components/layout/sub-header.scss');
</style>