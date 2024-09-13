<template>
  <div class="modal" v-if="modalShow">
    <div class="modal-container">
      <div class="modal-head">
        <p class="title">
          <slot name="title" />
        </p>

        <button
            type="button"
            class="btn-close"
            @click="modalClose"
        >
          <i class="icon-x" />
        </button>
      </div>

      <div class="modal-body">
        <slot />
      </div>

      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
const modalShow = ref(false);

const modalOpen = () => {
  modalShow.value = true;
}

const modalClose = () => {
  modalShow.value = false;
}

watch(() => modalShow.value, () => {
  document.querySelector('body').style.overflow = modalShow.value ? 'hidden' : '';
});

defineExpose({
  modalOpen,
  modalClose,
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/base/modal.scss';
</style>