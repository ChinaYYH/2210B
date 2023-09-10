<script setup lang="ts">
const tabBarList = [
  {
    name: '首页',
    default: 'home-index-default',
    active: 'home-index-active',
    path: '/home'
  },
  {
    name: '健康百科',
    default: 'home-article-default',
    active: 'home-article-active',
    path: '/article'
  },
  {
    name: '消息中心',
    default: 'home-notice-default',
    active: 'home-notice-active',
    path: '/notify'
  },
  {
    name: '我的',
    default: 'home-mine-default',
    active: 'home-mine-active',
    path: '/user'
  }
]
</script>

<template>
  <div class="layout-page">
    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item v-for="(item, index) in tabBarList" :key="index" :to="item.path">
        {{ item.name }}
        <template #icon="{ active }">
          <cp-icons :name="active ? item.active : item.default"></cp-icons>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  ::v-deep() {
    .van-tabbar-item {
      color: var(--cp-text2);
      &__text {
        font-size: 11px;
      }
      &__icon {
        font-size: 21px;
      }
      &--active {
        color: var(--cp-primary);
      }
    }
  }
}
</style>
