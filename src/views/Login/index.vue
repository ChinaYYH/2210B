<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores/user'
import { showToast } from 'vant'
import { useRouter, useRoute } from 'vue-router'

// 初始化store
const store = useUserStore()

// 初始化router与route
const router = useRouter()
const route = useRoute()

// 初始化密码与短信验证码界面状态
const isPass = ref(true)

// 手机号// 密码
const loginForm = ref({
  mobile: '13230000002', // 13230000001
  password: 'abc12345',
  code: ''
})

// 协议状态
const agree = ref<boolean>(false)
// 密码状态
const show = ref<boolean>(false)
// 登录方法
const hanleLogin = async () => {
  if (!agree.value) {
    showToast('请勾选我已同意')
    return
  }

  // 第一种, 不是因为token过期进入到登录页面, 而是我们打开项目自己进入登录页, 没有携带当前页面的地址
  // 第二种 token过期, 自动跳转到登录页, 如果是第二种情况的话, 会携带当前的页面地址

  try {
    // 如果isPass的值为true,则表示是密码登录, false, 短信验证码登录
    // 调用登录接口

    const loginRes = isPass.value
      ? await loginByPassword(loginForm.value.mobile, loginForm.value.password)
      : await loginByMobile(loginForm.value.mobile, loginForm.value.code)

    // 将登录成功的token存储搭配本地和pinia
    store.setUser(loginRes.data)

    // 跳转到主页
    router.replace((route.query.returnUrl as string) || '/user')

    // 提示登录成功
    showToast('登录成功')
  } catch (error) {
    console.log(error)
  }
}

const time = ref(0)
let timeId: number = 0
// 发送验证码
const sendCode = async () => {
  if (time.value > 0) return

  // 调用接口
  const codeRes = await sendMobileCode(loginForm.value.mobile, 'login')

  // 倒计时逻辑
  showToast('发送成功')
  time.value = 60
  clearInterval(timeId)
  timeId = setInterval(() => {
    time.value--
    if (time.value <= 0) clearInterval(timeId)
  }, 1000)
}

// 当页面卸载的时候, 清除定时器
onUnmounted(() => {
  clearInterval(timeId)
})
</script>

<template>
  <div class="login-page">
    <!-- navbar -->
    <cp-nav-bar right-text="注册" @click-right="$router.push('/register')"></cp-nav-bar>

    <!-- head -->
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span @click="isPass = !isPass">{{ isPass ? '短信验证码登录' : '密码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>

    <!-- form表单 -->
    <van-form autocomplete="off" @submit="hanleLogin">
      <van-field
        :rules="mobileRules"
        v-model="loginForm.mobile"
        placeholder="请输入手机号码"
        type="tel"
      />
      <van-field
        :rules="passwordRules"
        v-model="loginForm.password"
        placeholder="请输入密码"
        :type="show ? 'text' : 'password'"
        v-if="isPass"
      >
        <template #button>
          <cp-icons :name="`login-eye-${show ? 'on' : 'off'}`" @click="show = !show"></cp-icons>
        </template>
      </van-field>
      <van-field
        :rules="codeRules"
        v-model="loginForm.code"
        placeholder="请输入验证码"
        type="text"
        v-else
      >
        <template #button>
          <span class="send-btn" :class="{ active: time > 0 }" @click="sendCode">
            {{ time > 0 ? time + 's后再次发送' : '发送验证码' }}</span
          >
        </template>
      </van-field>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码</a>
      </div>
    </van-form>

    <!-- footer -->
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  &-page {
    padding-top: 46px;
  }
  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h3 {
      font-weight: normal;
      font-size: 24px;
    }

    a {
      font-size: 15px;
    }
  }
  &-other {
    margin-top: 60px;
    padding: 0 30px;

    .icon {
      display: flex;
      justify-content: center;

      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}

.van-form {
  padding: 0 15px;

  .cp-cell {
    height: 52px;
    line-height: 24px;
    padding: 14px 15px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .van-checkbox {
    a {
      color: var(--cp-primary);
      padding: 0 5px;
    }
  }
}
.send-btn {
  color: var(--cp-primary);
  &.active {
    color: rgba(22, 194, 163, 0.5);
  }
}
</style>
