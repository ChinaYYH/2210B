<script setup lang="ts">
import { getUserInfo } from '@/services/user'
import { ref } from 'vue'
import type { UserInfo } from '@/types/user'
import { showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

// 初始化store&router
const store = useUserStore()
const router = useRouter()

// 初始化一个变量, 用来保存用户信息
const user = ref<UserInfo>()

// 获取用户信息
const initUserInfo = async () => {
  const userRes = await getUserInfo()
  user.value = userRes.data
}
initUserInfo()

// 初始化快捷工具数据
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]

// 退出登录方法
const logout = async () => {
  const res = await showConfirmDialog({
    title: '温馨提示',
    message: '您确认要退出优医问诊吗？'
  })

  // 清除本地的用户信息和pinia用户信息
  store.delUser()
  // 跳转回登录页
  router.push('/login')
}
</script>

<template>
  <div class="user-page" v-if="user">
    <div class="user-page-header">
      <div class="top">
        <van-image width="70px" height="70px" round :src="user?.avatar" />
        <div class="name">
          <p>{{ user?.account }}</p>
          <p><van-icon name="edit" /></p>
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ user?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.likeNumber }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{ user?.score }}</p>
          <p>积分</p>
        </van-col>
        <van-col span="6">
          <p>{{ user.couponNumber }}</p>
          <p>优惠卷</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-page-order">
      <div class="header">
        <h3>药品订单</h3>
        <router-link to="/order">全部订单 <van-icon name="arrow" /></router-link>
      </div>
      <van-row>
        <van-col span="6">
          <cp-icons name="user-paid" />
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <cp-icons name="user-shipped" />
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <cp-icons name="user-received" />
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <cp-icons name="user-finished" />
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>

    <div class="user-page-group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :key="index"
        :title="item.label"
        is-link
        :border="false"
        :to="item.path"
      >
        <template #icon>
          <cp-icons :name="`user-tool-0${index + 1}`" />
        </template>
      </van-cell>
    </div>

    <a class="logout" href="javascript:;" @click="logout">退出登录</a>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  min-height: calc(100vh - 50px);
  background-color: var(--cp-bg);
  padding: 0 15px 65px;

  &-header {
    height: 200px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    margin: 0 -15px;
    padding: 0 15px;
    .top {
      display: flex;
      align-items: center;
      padding-top: 50px;

      .name {
        padding-left: 15px;

        p {
          &:first-child {
            font-size: 18px;
            font-weight: 500;
          }
          &:last-child {
            margin-top: 10px;
            color: var(--cp-primary);
            font-size: 16px;
          }
        }
      }
    }

    .van-row {
      padding-top: 15px;
      margin: 0 -15px;
      p {
        text-align: center;

        &:first-child {
          font-size: 18px;
          font-weight: 500;
        }

        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }

  &-order {
    background-color: #fff;
    border-radius: 8px;
    padding-bottom: 15px;
    margin-bottom: 15px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      height: 50px;
      line-height: 50px;

      a {
        color: var(--cp-tip);
      }
    }

    .van-col {
      text-align: center;

      .cp-icon {
        font-size: 28px;
      }
      p {
        font-size: 12px;
        padding-top: 4px;
      }
    }
  }

  &-group {
    background-color: #fff;
    border-radius: 8px;

    h3 {
      padding-left: 16px;
      line-height: 44px;
    }

    .van-cell {
      align-items: center;
    }

    .cp-icon {
      font-size: 17px;
      margin-right: 10px;
    }
  }
}
.logout {
  display: block;
  margin: 20px auto;
  width: 100px;
  text-align: center;
  color: var(--cp-price);
}
</style>
