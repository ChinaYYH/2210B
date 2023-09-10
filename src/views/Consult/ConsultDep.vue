<script setup lang="ts">
import { ref, computed } from 'vue'
import type { DepList, SubDep } from '@/types/consult'
import { getAllDep } from '@/services/consult'
import { useConsultStore } from '@/stores/consult'
const store = useConsultStore()

const list = ref<DepList>([])
// const childList = ref<SubDep[]>()
const active = ref(0)

const initDepList = async () => {
  const depRes = await getAllDep()
  list.value = depRes.data
  // childList.value = list.value[active.value].child
}
initDepList()

const childList = computed(() => {
  return list.value[active.value]?.child
})

// const onChange = (index: number) => {
//   active.value = index
//   if (list.value) {
//     childList.value = list.value[index].child
//   }
// }
</script>

<template>
  <div class="consult-dep-page">
    <cp-nav-bar title="选择科室"></cp-nav-bar>
    <div class="wrapper">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="(item, index) in list" :key="index" :title="item.name" />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          @click="store.setDepId(child.id)"
          v-for="(child, i) in childList"
          :key="i"
          to="/consult/illness"
          >{{ child.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.consult-dep-page {
  padding-top: 46px;

  .wrapper {
    height: calc(100vh - 46px);
    overflow: hidden;
    display: flex;
  }

  .sub-dep {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    a {
      display: block;
      padding: 14px 30px;
      color: var(--cp-dark);
    }
  }

  .van-sidebar {
    width: 114px;

    &-item {
      padding: 14px;
      color: var(--cp-tag);

      &--select {
        color: var(--cp-main);
        font-weight: normal;

        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
