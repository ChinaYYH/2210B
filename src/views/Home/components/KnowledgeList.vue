<script setup lang="ts">
import KnowledgeCard from './KnowledgeCard.vue'
import { ref } from 'vue'
import { getConsultList } from '@/services/consult'
import type { KnowledgeParams } from '@/services/types/consult'
import type { KnowledgeType, KnowledgePage, KnowledgeList } from '@/types/consult'

// 接收父组件传递的参数
const props = defineProps<{
  type: KnowledgeType
}>()

// 初始化请求的参数
const consultParams = ref<KnowledgeParams>({
  type: props.type,
  current: 1,
  pageSize: 10
})

// 初始化一个变量,保存返回的数据
const consultData = ref<KnowledgePage>()

// c初始化一个变量,保存帖子列表数据
const list = ref<KnowledgeList>([])

// 设置loading加载, false 显示loading加载
const loading = ref(false)

// 设置加载是否加载完毕  true 则会显示没有更多了, 并且会让loading的加载中消失
const finished = ref(false)

// 初始化请求
// const initConsultList = async () => {
//   const consultRes = await getConsultList(consultParams.value)
//   consultData.value = consultRes.data
//   // list.value = consultData.value.rows
//   list.value.push(...consultData.value.rows)
// }

// 当滚动到页面底部的时候触发onLoad
const onLoad = async () => {
  const consultRes = await getConsultList(consultParams.value)
  list.value.push(...consultRes.data.rows)
  // await initConsultList()

  // 当前滚动的页码, 大于或者等于 后台返回的总页码, 说明数据已经加载完成了
  if (consultParams.value.current >= consultRes.data.pageTotal) {
    finished.value = true
  } else {
    consultParams.value.current++
    loading.value = false
  }
}
</script>

<template>
  <div class="knowledge-list-page">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard v-for="(item, index) in list" :key="index" :item="item"></KnowledgeCard>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list-page {
  padding: 0 15px;
}
</style>
