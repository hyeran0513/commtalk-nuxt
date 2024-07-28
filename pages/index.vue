<template>
  <div class="main">
    <div class="main-left">
      <div class="main-left-item">
        <MainBanner />
      </div>

      <div class="main-left-item">
        <MainBoard />
      </div>
    </div>

    <div class="main-right">
      <div class="main-right-item">
        <MainProfileBox />
      </div>

      <div class="main-right-item">
        <MainPopular />
      </div>
    </div>
  </div>  
</template>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/index.scss');
</style>