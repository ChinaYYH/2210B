<script setup lang="ts">
import DoctorCard from './DoctorCard.vue'
import { getDoctorPage } from '@/services/consult'
import { ref, onMounted, onUnmounted } from 'vue'
import type { DoctorList } from '@/types/consult'
import { useWindowSize } from '@vueuse/core'

const pageParams = ref({
  current: 1,
  pageSize: 5
})

const doctorList = ref<DoctorList>()

const initDoctorList = async () => {
  const doctorRes = await getDoctorPage(pageParams.value)
  doctorList.value = doctorRes.data.rows
}
initDoctorList()

let widthValue = ref(0)
const setWidth = () => {
  const { width } = useWindowSize()
  widthValue.value = (150 / 375) * width.value
}

onMounted(() => {
  setWidth()
  window.addEventListener('resize', setWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', setWidth)
})
</script>

<template>
  <div class="follow-foctor-page">
    <div className="follow-foctor-page-header">
      <p>推荐关注</p>
      <a href="javascript:;"> 查看更多<i class="van-icon van-icon-arrow" /></a>
    </div>
    <div class="follow-foctor-page-body">
      <van-swipe :width="widthValue" :show-indicators="false" :loop="false">
        <van-swipe-item v-for="(item, index) in doctorList" :key="index">
          <DoctorCard :item="item"></DoctorCard>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.follow-foctor-page {
  background-color: var(--cp-bg);
  height: 250px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 45px;
    padding: 0 15px;
    font-size: 13px;

    > a {
      color: var(--cp-tip);
    }
  }

  &-body {
    width: 100%;
    overflow: hidden;
  }
}
</style>
