<template>
  <div ref="tuiGrid"></div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, watch, toRefs, getCurrentInstance} from 'vue';
import {useNuxtApp} from '#app';

const nuxtApp = useNuxtApp();
const Grid = nuxtApp.$toastGrid;

const props = defineProps({
  data: {
    type: [Array, Object],
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default() {
      return {};
    },
  },
  theme: {
    type: [String, Object],
    validator(value) {
      const presetTheme = ['default', 'striped', 'clean'];
      if (typeof value === 'string') {
        return presetTheme.indexOf(value) > -1;
      } else {
        return value.hasOwnProperty('name') && value.hasOwnProperty('value');
      }
    },
  },
  language: {
    type: [String, Object],
    validator(value) {
      const presetLanguage = ['en', 'ko'];
      if (typeof value === 'string') {
        return presetLanguage.indexOf(value) > -1;
      } else {
        return value.hasOwnProperty('name') && value.hasOwnProperty('value');
      }
    },
  },
});

// grid 인스턴스와 DOM 요소 참조
const tuiGrid = ref(null);
let gridInstance = null;

const {data, columns, options, theme, language} = toRefs(props);

// 그리드 초기화 및 옵션 설정
const initializeGrid = () => {
  const gridOptions = Object.assign(options.value || {}, {
    el: tuiGrid.value,
    data: data.value,
    columns: columns.value,
  });

  gridInstance = new Grid(gridOptions);
  applyTheme();
  setLanguage();
};

// 테마 적용 함수
const applyTheme = () => {
  if (theme.value) {
    if (typeof theme.value === 'string') {
      Grid.applyTheme(theme.value);
    } else {
      Grid.applyTheme(theme.value.name, theme.value.value);
    }
  }
};

// 언어 설정 함수
const setLanguage = () => {
  if (language.value) {
    if (typeof language.value === 'string') {
      Grid.setLanguage(language.value);
    } else {
      Grid.setLanguage(language.value.name, language.value.value);
    }
  }
};

// 그리드 파괴
onBeforeUnmount(() => {
  if (gridInstance) {
    gridInstance.destroy();
    gridInstance = null;
  }
});

// 마운트 시 그리드 초기화
onMounted(() => {
  initializeGrid();
});

// prop이 변경될 경우 그리드 재초기화
watch([data, columns, options], () => {
  if (gridInstance) {
    const currentData = gridInstance.store.data.rawData;
    const newData = data.value;

    // 데이터가 변경되었는지 확인
    if (JSON.stringify(currentData) !== JSON.stringify(newData)) {
      gridInstance.resetData(newData);
    }
  }
});
</script>

<style scoped>
@import 'https://uicdn.toast.com/tui-grid/latest/tui-grid.css';
</style>