<template>
  <div class="gate">
    <div class="gate-box">
      <div class="title">로그인</div>

      <div class="form">
        <div class="form-box">
          <dl class="form-item is-focus">
            <dt>아이디</dt>
            <dd>
              <input type="text" placeholder="아이디를 입력해 주세요." />
            </dd>
          </dl>

          <div class="form-info">아이디를 입력해 주세요.</div>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>비밀번호</dt>
            <dd>
              <input type="password" placeholder="비밀번호를 입력해 주세요." />
            </dd>
          </dl>
        </div>
      </div>

      <button type="submit" class="btn-f-fill-main btn-submit" title="로그인">로그인</button>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: 'gate'
  })
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/gate.scss');
</style>