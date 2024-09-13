<template>
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
</template>