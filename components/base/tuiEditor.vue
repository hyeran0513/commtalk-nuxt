<template>
  <div class="editor-wrap">
    <div :id="key"/>
  </div>
</template>

<script setup>
import Editor from '@toast-ui/editor';
import { useRuntimeConfig } from 'nuxt/app';

const loadingYn = ref(false);
const random = Math.random().toString(36).substring(2, 11);

const key = ref('tui' + random);
let editor = null;
const config = useRuntimeConfig();
const emit = defineEmits(['getEditor']);
const props = defineProps({
  editorId: String,
  defaultValue: String,
  modelValue:String,
  // 2024.09.03 [mhlim]: 특정 페이지에서 전달받는 editor toolbarItems 설정값
  toolbarItems:Array,
});
const editorValue = ref(props.modelValue);

onMounted(() => {
  editor = new Editor({
    el: document.querySelector('#' + key.value),
    previewStyle: 'tab',
    height: 'auto',
    initialEditType: 'wysiwyg',
    autofocus: false,
    initialValue: jsNvl(props.defaultValue, editorValue.value),
    hideModeSwitch: true,
    hooks: {
      addImageBlobHook: onUploadImage,
    },
    customHTMLRenderer: {
      htmlBlock: {
        iframe(node) {
          return [
            {
              type: 'openTag',
              tagName: 'iframe',
              outerNewLine: true,
              attributes: node.attrs,
            },
            { type: 'html', content: node.childrenHTML },
            { type: 'closeTag', tagName: 'iframe', outerNewLine: true },
          ];
        },
      },
    },
    // 2024.09.03 [mhlim]: 특정 페이지에서 전달받는 editor toolbarItems 설정값에 따라 세팅
    toolbarItems: props.toolbarItems ?
        [props.toolbarItems] :
        [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
          [
            {
              el: createYoutubeButton(),
              tooltip: '유튜브 링크 등록',
            },
          ]
        ],
    plugins: [colorSyntax],
    events: {
      change: () => {
        emit('update:modelValue', editor.getMarkdown());
      }
    }
  });

  emit('getEditor', editor);
});

// 2023.05.02[jrjang]: 유튜브 등록 버튼 툴바에 그리기
function createYoutubeButton() {
  const button = document.createElement('button');

  button.className = 'toastui-editor-toolbar-icons youtube';
  button.style.margin = '0';
  button.addEventListener('click', () => {
    const link = prompt('유튜브 링크를 입력해주세요');

    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = link?.match(regExp);
    const videoId = match && match[7]?.length == 11 ? match[7] : false;

    if (videoId) {
      const oldMarkdown = editor.getMarkdown();
      const content = '<iframe width="420" height="315" src="https://www.youtube.com/embed/' + videoId + '"></iframe>';
      editor.setMarkdown(oldMarkdown + '\n\n' + content + '\n\n');
    }
  });
  return button;
}

const onUploadImage = async (blob, callback) => {
  loadingYn.value = true
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('uploadPath', '/editor');

  const { data } = await useWbFetch('/file/upload', {
    baseURL: 'lxp',
    method: 'POST',
    body: formData,
  });

  // 2023.08.04[skkim]: 에디터 이미지 attributes(width, height) 추가용 값 셋팅
  const imageUrl = config.public.baseURL + '/static' + data.filePath + "?imgWidth=" + data.imgWidth + "&imgHeight=" + data.imgHeight;

  loadingYn.value = false
  callback(imageUrl);
};

const jsNvl = (str, defaultStr) => {
  if (str === undefined || str === null || str === '') {
    str = defaultStr;
  }

  return str;
}
</script>