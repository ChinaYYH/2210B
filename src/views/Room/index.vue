<script setup lang="ts">
// 获取到聊天记录 (默认消息 患者信息 时间 问诊室状态)
import RoomStatus from './components/RoomStatus.vue'
import RoomAction from './components/RoomAction.vue'
import RoomMessage from './components/RoomMessage.vue'
import { io } from 'socket.io-client'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute } from 'vue-router'
import type { Message, TimeMessages } from '@/types/room'
import { MsgType } from '../../enum/index'
const store = useUserStore()
const route = useRoute()

const list = ref<Message[]>()

onMounted(async () => {
  // 连接websocket
  const socket = io('https://consult-api.itheima.net/', {
    auth: {
      token: 'Bearer ' + store.user?.token
    },
    query: {
      orderId: route.query.orderId
    }
  })

  // 监听是否连接成功
  socket.on('connect', () => {
    console.log('连接成功')
  })

  // 监听是否断开链接
  socket.on('disconnect', () => {
    console.log('断开链接')
  })

  // 监听是否连接失败
  socket.on('error', (event) => {
    console.log('连接失败', event)
  })

  // 监听默认的聊天信息
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    const arr: Message[] = []

    console.log('e', data)
    data.forEach((item) => {
      arr.push({
        msgType: MsgType.Notify,
        createTime: item.createTime,
        id: item.createTime,
        msg: { content: item.createTime }
      })
      arr.push(...item.items)
    })
    console.log('arr', arr)
    list.value = arr
  })
})
</script>

<template>
  <div class="room-page">
    <cp-nav-bar title="医生问诊室"></cp-nav-bar>
    <room-status></room-status>
    <room-message :list="list"></room-message>
    <room-action></room-action>
    <!--<van-button @click="$router.push('/order/pay?id=6938560516042752')">购买药品</van-button> -->
  </div>
</template>

<style lang="scss" scoped>
.room-page {
  padding-top: 24vw;
  padding-bottom: 16vw;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
}
</style>
