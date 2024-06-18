<template>
  <div class="layout">
    <LayoutSubHeader />
    <LayoutHeader />
    <LayoutCategory />

    <div class="content">
      <slot />
    </div>

    <LayoutFooter />
  </div>
</template>