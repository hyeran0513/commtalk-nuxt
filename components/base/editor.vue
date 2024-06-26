<template>
  <div ref="editor" />
</template>

<script setup>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const props = defineProps({
  modelValue: {
    type: String,
    required: false,
    default: ''
  },
  defaultValue: {
    type: String,
    required: false,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);
const editor = ref();
const editorValid = ref();

onMounted(() => {
  editorValid.value = new Editor({
    el: editor.value,
    height: '500px',
    initialEditType: 'wysiwyg',
    initialValue: props.defaultValue,
    events: {
      change: () => emit('update:modelValue', editorValid.value.getMarkdown()),
    },
  });
});
</script>