<template>
  <div class="post">
    <div class="post-inner">
      <div class="title">{{ boardData.TITLE }}</div>
      <div class="content">{{ boardData.CONTENT }}</div>
      <div class="user-info">
        <div class="profile">
          <div class="profile-img" v-if="boardData.USER_INFO.PROFILE"></div>
          <div class="profile-default" v-else></div>
        </div>

        <div class="user-name">{{ boardData.USER_INFO.USER_NAME }}</div>
        <div class="date">{{ boardData.DATE }}</div>
      </div>


      <div class="btn-wrap">
        <div class="btn-group">
          <button type="button" class="btn-comment" @click="showComment = !showComment">
            <span class="txt">댓글 {{ boardData.COUNT.COMMENT }}</span> 
            <i class="icon-chevron-down" v-if="showComment" />
            <i class="icon-chevron-up" v-else />
          </button>

          <button type="button" class="btn-like" :class="{'is-active': isLike}" @click="isLike = !isLike">좋아요 {{ boardData.COUNT.LIKE }}</button>
          
          <button type="button" class="btn-view" disabled>조회수 {{ boardData.COUNT.VIEW }}</button>
        </div>

        <NuxtLink to="/board/1" class="btn-s-fill-main" title="목록으로">목록으로</NuxtLink>
      </div>

      <transition name="fade">
        <div class="comment-box" v-if="showComment">      
          <div class="user-comment-box">
            <div class="comment-list">
              <div class="comment-list-item" v-for="(item, i) in data" :key="i">
                <div class="profile">
                  <div class="profile-img" v-if="item.USER_INFO.PROFILE"></div>
                  <div class="profile-default" v-else></div>
                </div>

                <div class="detail">
                  <div class="top-area">
                    <div class="user-name">{{ item.USER_INFO.USER_NAME}}</div>
                    
                    <div class="tooltip" ref="tooltipRef">
                      <transition name="fade">
                        <div class="tooltip-box" v-if="tooltipIndex === i">
                          <ul class="tooltip-list">
                            <li class="item">
                              <button type="button" class="has-icon">
                                <i class="icon-edit" />
                                <span class="txt">수정</span>
                              </button>
                            </li>
                            
                            <li class="item">
                              <button type="button" class="has-icon">
                                <i class="icon-trash-2" />
                                <span class="txt">삭제</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </transition>

                      <button type="button" class="btn-dots tooltip-btn" @click="tooltipIndex = i"><span class="icon-more-vertical" /></button>
                    </div>
                  </div>

                  <div class="content">
                    <span class="tag-user">@{{ item.TAG }}</span>{{ item.CONTENT }}
                  </div>

                  <div class="bottom-area">
                    <span class="date">
                      <template v-if="item.MODIFY_DATE">{{ item.MODIFY_DATE }}</template>
                      <template v-else>{{ item.CREATE_DATE}}</template>
                    </span>

                    <button type="button" class="btn-reply" title="답글 쓰기">
                      <i class="icon-corner-down-right" />
                      <span class="txt">답글 쓰기</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p class="title">댓글 작성</p>

            <div class="write">
              <textarea type="text" class="write-input" placeholder="댓글을 작성해 주세요." />
              <button type="button" class="btn-submit">등록</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";

const tooltipRef = ref();
const tooltipIndex = ref();

onClickOutside(tooltipRef, event => {
  tooltipIndex.value = '';
});

const showComment = ref(true);
const isLike = ref(false);

const boardData = reactive({
  USER_INFO: {
    PROFILE: '',
    USER_NAME: '홍길동'
  },
  TITLE: '제목',			
  DATE: '2024.06.19',
  CONTENT: '내용',
  COUNT: {
    LIKE: '10',
    COMMENT: '10',
    VIEW: '10'
  }
});

const data = reactive([
	{
		COMMENT_ID: '1',
		TAG: '김혜란',
		USER_INFO: {
			PROFILE: '',
			USER_NAME: '홍길동'
		},
		CONTENT: '내용',
		CREATE_DATE: '2024.06.19',
		MODIFY_DATE: '2024.06.20'
	},
	{
		COMMENT_ID: '2',
    UPPER_ID: '1',
		TAG: '김혜란',
		USER_INFO: {
			PROFILE: '',
			USER_NAME: '홍길동'
		},
		CONTENT: '내용',
		CREATE_DATE: '2024.06.19',
		MODIFY_DATE: '2024.06.20'
	}
]);
</script>

<style lang="scss" scoped>
@import url('~/assets/scss/pages/detail/post.scss');
</style>