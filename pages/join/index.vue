<template>
  <div class="gate">
    <div class="gate-box">
      <div class="title">회원가입</div>
      
      <div class="form">
        <div class="form-box">
          <dl class="form-item">
            <dt>아이디</dt>
            <dd>
              <input type="text" placeholder="아이디를 입력해 주세요." />
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>비밀번호</dt>
            <dd class="col">
              <input type="password" placeholder="비밀번호를 입력해 주세요." />
              <input type="password" placeholder="비밀번호를 한번 더 입력해 주세요." />
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>이름</dt>
            <dd>
              <input type="text" placeholder="이름을 입력해 주세요." />
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>이메일</dt>
            <dd class="email">
              <div class="flex-box">
                <input type="text" placeholder="example"/>
                <span>@</span>
                <input type="text" placeholder="example.com" v-model="emailDomain" />
              </div>

              <select v-model="selectedDomain">
                <option value="직접입력">직접입력</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="kakao.net">kakao.net</option>
                <option value="gmail.com">gmail.com</option>
              </select>
            </dd>
          </dl>
        </div>

        <div class="form-box">
          <dl class="form-item">
            <dt>연락처</dt>
            <dd>
              <input type="number" placeholder="연락처를 입력해 주세요." />
            </dd>
          </dl>
        </div>
      </div>

      <button type="submit" class="btn-f-fill-main btn-submit" title="가입하기">가입하기</button>
    </div>
  </div>
</template>

<script setup>
 const emailDomain = ref('');
  const selectedDomain = ref('직접입력');

  watch(selectedDomain, (newValue) => {
    emailDomain.value = (newValue === '직접입력') ? '' : newValue;
  })

  definePageMeta({
    layout: 'gate'
  })
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/gate.scss');
</style>