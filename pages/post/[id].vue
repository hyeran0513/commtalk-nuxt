<template>
  <div class="post">
    <div class="post-inner">
      <div class="top-area">
        <div class="user-info">
          <div class="profile">
            <div class="profile-img" v-if="boardData?.PROFILE"></div>
            <div class="profile-default" v-else></div>
          </div>

          <div class="info">
            <div class="user-name">{{ boardData?.author?.nickname }}</div>
            <div class="date">{{ boardData?.updatedAt }}</div>
          </div>
        </div>

        <div class="title">{{ boardData?.title }}</div>
      </div>

      <div class="content" v-html="boardData?.content"></div>

      <div class="file-img" v-if="fileList">
        <template v-for="(fileImg, fileImgIdx) in fileList">
          <div class="file-img-item" :style="{background: `#f8f8f8 url(${ fileImg?.fileUrl }) no-repeat center/auto 100%`}"></div>
        </template>
      </div>

      <div class="btn-wrap">
        <div class="btn-group">
          <button
              type="button"
              class="btn-comment"
              @click="showComment = !showComment"
          >
            <template v-if="boardData?.commentableYN">
              <span class="txt">댓글</span>
              <span class="count">{{ boardData?.commentCnt }}</span>

              <template v-if="boardData?.commentableYN">
                <i class="icon-chevron-down" v-if="showComment" />
                <i class="icon-chevron-up" v-else />
              </template>
            </template>
            <template v-else>
              <span class="txt">댓글 거부</span>
            </template>
          </button>

          <button
              type="button"
              class="btn-like"
              :class="{'is-active': boardData?.likeYN}"
              @click="handleLike"
          >
            <span class="txt">공감</span>
            <span class="count">{{ boardData?.likeCnt }}</span>
          </button>

          <button
              type="button"
              class="btn-scrap"
              :class="{'is-active': boardData?.scrapYN}"
              @click="handleScrap"
          >
            <span class="txt">스크랩</span>
            <span class="count">{{ boardData?.scrapCnt }}</span>
          </button>

          <button
              type="button"
              class="btn-view"
              disabled>
            <span class="txt">조회수</span>
            <span class="count">{{ boardData?.viewCnt }}</span>
          </button>
        </div>

        <NuxtLink
            to="/board/1"
            class="btn-s-fill-main btn-list"
            title="목록으로"
        >
          목록으로
        </NuxtLink>
      </div>

      <template v-if="boardData?.commentableYN">
        <CommentForm
            :postId="route.params.id"
            v-if="showComment"
            @refreshComments="refreshComments" />

        <CommentList
            v-if="showComment"
            :comments="comments"
            @refreshComments="refreshComments" />
      </template>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {useLocalStorage} from "@vueuse/core";

const token = useLocalStorage('token', '');

const showComment = ref(true);
const route = useRoute();

// 게시판
const { data: boardData, refresh: refreshBoardData } = await useAsyncData('boardData',
  () => $fetch(`/api/v1/boards/${route.query.boardId}/posts/${route.params.id}`, {
    params: {
      boardId: route.query.boardId,
      postId: route.params.id
    }
  })
);

// 댓글
const { data: comments, refresh: refreshComments } = await useAsyncData('comments',
  () => $fetch(`/api/v1/posts/${route.params.id}/comments`, {
    headers: {
      'Authorization': `Bearer ${token.value}`,
      'Content-Type': 'application/json'
    },
    params: {
      postId: route.params.id
    }
  })
);

// 게시글 좋아요
const handleLike = async () => {
  try {
    const response = await fetch(`/api/v1/boards/${route.query.boardId}/posts/${route.params.id}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log("성공");
      const data = await response.json();

      boardData.value.likeCnt = data.likeCnt;
      boardData.value.likeYN = data.likeYN;
    } else {
      console.log("성공X");
    }
  } catch (error) {
    console.error('에러:', error);
  }
}

// 게시글 스크랩
const handleScrap = async () => {
  try {
    const response = await fetch(`/api/v1/boards/${route.query.boardId}/posts/${route.params.id}/scrap`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      console.log("성공");
      const data = await response.json();

      boardData.value.scrapCnt = data.scrapCnt;
      boardData.value.scrapYN = data.scrapYN;
    } else {
      console.log("성공X");
    }
  } catch (error) {
    console.error('에러:', error);
  }
}

// 게시글 파일 URL 리스트 조회
const { data: fileList, refresh: refreshFileList } = await useAsyncData('fileList',
    () => $fetch(`/api/v1/files/post/${route.params.id}`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      }
    })
);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/detail/post.scss');
</style>