<template>
  <header>
    <div class="header-inner">
      <NuxtLink to="/" class="logo"></NuxtLink>

      <div class="search">
        <div class="search-inner">
          <input type="text" placeholder="검색어를 입력해 주세요." />

          <button type="button" title="검색">
            <i class="icon-search" />
          </button>
        </div>
      </div>

      <button type="button" class="btn-s-fill-main btn-logout" title="로그아웃">로그아웃</button>
    </div>
  </header>
</template>