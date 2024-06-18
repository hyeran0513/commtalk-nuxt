<template>
  <div class="layout">
    <LayoutHeader />
    <LayoutCategory />

    <div class="content">
      <slot />
    </div>

    <LayoutFooter />
  </div>
</template>