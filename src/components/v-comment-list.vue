<template>
  <div class="comment-list">
    <div class="comment">
      <el-input
        placeholder="期待您的神评论"
        v-model="comment"
        clearable
      ></el-input
      ><button class="send">发布</button>
    </div>
    <div class="hot-comment-list">
      <p class="title">精彩评论 ({{hotCommentList.length}})</p>
      <div
        class="comment-info"
        v-for="(comment, index) in hotCommentList"
        :key="index"
      >
        <div
          class="head-img pull-left"
          v-lazy:background-image="comment.avatarurl"
        ></div>
        <div class="content pull-left">
          <p class="nickname">{{ comment.nick }}</p>
          <p class="content-detail" v-html="comment.rootcommentcontent"></p>
          <p class="time">{{ time(comment.time) }} <button class="jubao pull-right">举报</button></p>
        </div>
      </div>
    </div>
    <div class="normal-comment-list">
      <p class="title">全部评论 ({{commentList.length}})</p>
      <div
              class="comment-info"
              v-for="(comment, index) in commentList"
              :key="index"
      >
        <div
                class="head-img pull-left"
                v-lazy:background-image="comment.avatarurl"
        ></div>
        <div class="content pull-left">
          <p class="nickname">{{ comment.nick }}</p>
          <p class="content-detail" v-html="comment.rootcommentcontent"></p>
          <p class="time">{{ time(comment.time) }}</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getCommentList } from "@/api/sheet";
export default {
  name: "VCommentList",
  data() {
    return {
      commentList: [],
      hotCommentList: [],
      comment: ""
    };
  },
  created() {
    this.getCommentList();
  },
  methods: {
    getCommentList() {
      this.$axios.get(getCommentList).then(response => {
        if (response.data.response.code === 0) {
          this.commentList = response.data.response.comment.commentlist;
          this.hotCommentList = response.data.response.hot_comment.commentlist;
        } else {
          this.$message.error("获取评论信息失败");
        }
      });
    },
    time(time = +new Date()) {
      let date = new Date(time + 8 * 3600 * 1000);
      return date
        .toJSON()
        .substr(0, 19)
        .replace("T", " ")
        .replace(/-/g, ".");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variable";
@import "~@/assets/scss/mixin";
.comment-list {
  height: 60%;
  .comment {
    position: relative;
    .el-input {
      font-size: 12px;
    }
    .send {
      cursor: pointer;
      position: absolute;
      right: 3px;
      top: 2px;
      bottom: 2px;
      outline: none;
      border: none;
      background-color: #f3f3f3;
    }
    .send:hover {
      color: $select-bg-color;
    }
  }
  .hot-comment-list {
    .comment-info {
      width: 100%;
      height: 120px;
      border-bottom: 1px #cedfcc solid;
      .head-img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 15px;
        margin-top: 20px;
      }
      .content {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 90%;
        p {
          margin: 7px 0;
        }
        .nickname {
          font-size: 12px;
          color: #7d7d7d;
        }
        .content-detail {
          line-height: 20px;
          @include text-overflow;
          width: 100%;
        }
        .time {
          font-size: 12px;
          color: #7d7d7d;
          width: 100%;
        }
        &:hover .jubao {
          display: inline-block;
        }
        .jubao {
          height: 12px;
          display: none;
          outline: none;
          border: none;
          cursor: pointer;
        }
        .jubao:hover{
          color: $select-bg-color;
        }
      }
    }
  }
  .normal-comment-list {
    .title {
      margin-top: 40px;
    }
    .comment-info {
      width: 100%;
      height: 120px;
      border-bottom: 1px #cedfcc solid;
      .head-img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-right: 15px;
        margin-top: 20px;
      }
      .content {
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;width: 80%;
        p {
          margin: 7px 0;
        }
        .nickname {
          font-size: 12px;
          color: #7d7d7d;
        }
        .content-detail {
          line-height: 20px;
          @include text-overflow;
          width: 100%;
        }
        .time {
          font-size: 12px;
          color: #7d7d7d;
        }
      }
    }
  }
}
</style>
