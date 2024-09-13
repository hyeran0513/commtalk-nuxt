<template>
  <div class="wrapper">
    <div class="layout bg-white">
      <LayoutSubHeader />
      <LayoutHeader />
      <LayoutCategory />
      <LayoutBackButton />
      <LayoutQuickButton />

      <div class="content">
        <slot />
      </div>

      <LayoutFooter />
    </div>
  </div>
</template>