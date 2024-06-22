<template>
  <div class="layout bg-white">
    <LayoutSubHeader />
    <LayoutHeader />
    <LayoutCategory />

    <div class="content">
      <slot />
    </div>

    <LayoutFooter />
  </div>
</template>