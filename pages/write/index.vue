<template>
  <div class="write">
    <div class="form">
      <div class="form-item">
        <dl class="form-box">
          <dt>게시판</dt>
          <dd>
            <select>
              <option>전체</option>
              <option>자유게시판</option>
            </select>
          </dd>
        </dl>
      </div>

      <div class="form-item">
        <dl class="form-box">
          <dt>제목</dt>
          <dd>
            <input type="text" placeholder="제목을 입력해 주세요." />
          </dd>
        </dl>
      </div>

      <div class="form-item">
        <dl class="form-box">
          <dt>내용</dt>
          <dd>
            <BaseEditor v-model="editorValue" @get-editor="getEditor" :defaultValue="defaultValue" />
          </dd>
        </dl>
      </div>
    </div>

    <div class="btn-wrap">
      <NuxtLink to="/board/1" class="btn-s-line-main">취소</NuxtLink>
      <NuxtLink to="/" class="btn-s-fill-main">완료</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const editorValue = ref();
const defaultValue = ref('내용');

let editor = null;
const getEditor = (_editor) => {
  editor = _editor;
}
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/write.scss');
</style>