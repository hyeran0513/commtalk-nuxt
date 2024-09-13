<template>
  <div class="search">
    <div class="search-inner">
      <input
          type="text"
          placeholder="검색어를 입력해 주세요."
          v-model="keyword"
          @keyup.enter="search"
      />

      <button type="button" title="검색" @click="search">
        <i class="icon-search" />
      </button>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

// 검색
const keyword = ref();

const search = async () => {
  await router.push({ path: '/board/0', query: { keyword: keyword.value } });
  keyword.value = '';
}
</script>