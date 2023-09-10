import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user.d.ts'

export const useUserStore = defineStore(
  'mt-user',
  () => {
    // 保存用户信息
    const user = ref<User>()
    // 设置用户信息，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 删除用户信息, 退出登录/token过期
    const delUser = () => {
      user.value = undefined
    }
    // 初始化状态
    // const initUser = () => {
    //   const u = localStorage.getItem('user')
    //   if (u) {
    //     user.value = JSON.parse(u)
    //   }
    // }
    return {
      user,
      setUser,
      delUser
      // initUser
    }
  },
  {
    persist: true
  }
)
