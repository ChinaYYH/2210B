<script setup lang="ts">
import type { Knowledge } from '@/types/consult'
import useFollowDoctor from '../../../composable/useFollowDoctor'
defineProps<{
  item: Knowledge
}>()

const { loading, followDoctor } = useFollowDoctor('knowledge')
</script>

<template>
  <div class="knowledge-card-page">
    <div class="knowledge-card-page-header">
      <van-image round class="avatar" :src="item.creatorAvatar"></van-image>
      <div class="info">
        <p class="name">{{ item.creatorName }}</p>
        <p class="dep van-ellipsis">{{ item.creatorTitles }}</p>
      </div>
      <van-button :loading="loading" @click="followDoctor(item)" class="btn" size="small" round>
        {{ item.likeFlag ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    <div class="knowledge-card-page-body">
      <h3 class="title van-ellipsis">{{ item.title }}</h3>
      <!-- van-multi-ellipsis--l2/ -->
      <p class="intro van-multi-ellipsis--l2">
        {{ item.content.replace(/<[^>]+>/g, '') }}
      </p>
      <div class="imgs">
        <van-image v-for="(url, i) in item.coverUrl" :key="i" :src="url" />
      </div>
      <p class="logs">
        <span>{{ item.collectionNumber }} 收藏</span>
        <span>{{ item.commentNumber }} 评论</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-card-page {
  padding: 20px 0 16px;

  &-header {
    display: flex;
    align-items: center;
    ::v-deep() {
      .avatar {
        width: 38px;
        height: 38px;
        margin-right: 10px;
      }

      .info {
        width: 200px;
        margin-right: 10px;
        .name {
          color: var(--cp-text2);
        }

        .dep {
          color: var(--cp-tip);
          font-size: 12px;
        }
      }

      .btn {
        padding: 0 12px;
        border-color: var(--cp-primary);
        color: var(--cp-primary);
        height: 28px;
        width: 72px;
      }
    }
  }

  &-body {
    .title {
      font-size: 16px;
      margin-top: 8px;
      font-weight: normal;
    }

    .intro {
      margin-top: 7px;
      line-height: 2;
      color: var(--cp-text3);
    }

    .imgs {
      display: flex;
      .van-image {
        width: 106px;
        height: 106px;
        margin-right: 12px;
        border-radius: 12px;
        overflow: hidden;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .logs {
      margin-top: 10px;
      > span {
        color: var(--cp-tip);
        margin-right: 16px;
        font-size: 12px;
      }
    }
  }
}
</style>
