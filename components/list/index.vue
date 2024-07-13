<template>
  <div class="list">
    <div class="list-item" v-for="(item, i) in data" :key="i">
      <NuxtLink :to="`/post/${item?.POST_ID}`">
        <div class="title">{{ item?.TITLE }}</div>
        <div class="content">{{ item?.desc }}</div>

        <div class="bottom-area">
          <div class="count">
            <span class="count-comment">{{ item?.COUNT?.COMMENT }}</span>
            <span class="count-view">{{ item?.COUNT?.VIEW }}</span>
            <span class="count-like">{{ item?.COUNT?.LIKE }}</span>
          </div>

          <div class="user-info">
            <div class="user-profile">
              <div class="user-profile-img" v-if="item?.USER_INFO?.USER_PROFILE"></div>
              <div class="user-profile-default"></div>
            </div>

            <div class="user-name">{{ item?.USER_INFO?.USER_NAME }}</div>

            <div class="date">
              <template v-if="item?.MODIFY_DATE">{{ item?.MODIFY_DATE }}</template>
              <template v-else>{{ item?.CREATE_DATE }}</template>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps(['data']);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/components/list.scss');
</style>