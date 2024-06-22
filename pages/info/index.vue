<template>
  <section>
    <div class="section-title">개인정보 변경</div>
  
    <div class="section-content">
      <div class="section-content-inner">
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
              <dd>
                <button type="button" class="btn-s-fill-main" @click="showChangePwd = !showChangePwd">비밀번호 변경</button>
              </dd>
            </dl>
          </div>

          <div class="form-box" v-show="showChangePwd">
            <dl class="form-item">
              <dt>비밀번호 변경</dt>
              <dd class="change-pwd">
                <input type="password" placeholder="기존 비밀번호를 입력해 주세요." />
                <input type="password" placeholder="새 비밀번호를 입력해 주세요." />
                <input type="password" placeholder="새 비밀번호를 한번 더 입력해 주세요." />
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

        <button type="button" class="btn-f-fill-main btn-save">저장</button>
      </div>
    </div>
  </section>
</template>

<script setup>
  const showChangePwd = ref(false);

  const emailDomain = ref('');
  const selectedDomain = ref('직접입력');

  watch(selectedDomain, (newValue) => {
    emailDomain.value = (newValue === '직접입력') ? '' : newValue;
  })

  definePageMeta({
    layout: 'mypage'
  })
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/mypage/info.scss');
</style>