<template>
  <div class="nodata">
    <div class="nodata-inner">
      <i class="icon-file" />
      <div class="txt">{{ text }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/base/nodata.scss';
</style>