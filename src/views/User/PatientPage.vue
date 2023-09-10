<script setup lang="ts">
import { getPatientList, addPatient, editPatient, delPatient } from '@/services/patient'
import type { PatientList, PatientType } from '@/types/user'
import { ref, computed } from 'vue'
import { showToast } from 'vant'
import Validator from 'id-validator'
import { showConfirmDialog } from 'vant'
import { useRoute, useRouter } from 'vue-router'
import { useConsultStore } from '@/stores/consult'
const store = useConsultStore()

const route = useRoute()
const router = useRouter()

const isChange = computed(() => {
  return route.query.isChange
})

// 创建一个变量,保存患者列表
const list = ref<PatientList>()

// 初始化患者列表数据
const initPatientList = async () => {
  const patienRes = await getPatientList()
  list.value = patienRes.data

  if (isChange.value && list.value.length) {
    const defPatient = list.value.find((item) => item.defaultFlag === 1)
    if (defPatient) {
      patienId.value = defPatient.id as string
    } else {
      patienId.value = list.value[0].id as string
    }
  }
}
initPatientList()

// 创建性别数据
const options = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

// 控制弹出层显示与隐藏
const show = ref(false)

// 打开弹出层
const showPopup = (item?: PatientType) => {
  if (item) {
    const { id, gender, name, idCard, defaultFlag } = item
    patient.value = { id, gender, name, idCard, defaultFlag }
  } else {
    patient.value = { ...initPatient }
  }
  show.value = true
}

// 关闭弹出层
const backPopup = () => {
  show.value = false
}

// 监听保存按钮
const submit = async () => {
  if (!patient.value.name) return showToast('请输入真实姓名')
  if (!patient.value.idCard) return showToast('请输入身份证号')
  const validator = new Validator()
  if (!validator.isValid(patient.value.idCard)) return showToast('身份证格式错误')
  const { sex } = validator.getInfo(patient.value.idCard)
  if (patient.value.gender !== sex) return showToast('性别和身份证不符')

  // 保存/编辑患者
  patient.value.id ? await editPatient(patient.value) : await addPatient(patient.value)
  show.value = false
  initPatientList()
  showToast(patient.value.id ? '编辑成功' : '添加成功')
}

const initPatient: PatientType = {
  name: '',
  idCard: '',
  defaultFlag: 0,
  gender: 1
}

// 定义接收表单输入的数据
const patient = ref<PatientType>({ ...initPatient })

const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1 ? true : false
  },
  set(value) {
    patient.value.defaultFlag = value ? 1 : 0
  }
})

// 删除患者
const remove = async () => {
  if (patient.value.id) {
    await showConfirmDialog({
      title: '温馨提示',
      message: `您确认要删除 ${patient.value.name} 患者信息吗 `
    })
    await delPatient(patient.value.id)
    show.value = false
    initPatientList()
    showToast('删除成功')
  }
}

// 选择患者
let patienId = ref<string>('')
const selectedPatient = (item: PatientType) => {
  if (isChange.value) {
    patienId.value = item.id as string
  }
}

const next = () => {
  if (!patienId.value) return showToast('请选就诊择患者')

  store.setPatientId(patienId.value)
  router.push('/consult/pay')
}
</script>

<template>
  <div class="patient-page">
    <cp-nav-bar :title="isChange ? '选择患者' : '家庭档案'"></cp-nav-bar>
    <!-- 头部提示 -->
    <div class="patient-change" v-if="isChange">
      <h3>请选择患者信息</h3>
      <p>以便医生给出更准确的治疗，信息仅医生可见</p>
    </div>

    <div class="patient-page-list">
      <div
        class="patient-item"
        @click="selectedPatient(item)"
        v-for="(item, index) in list"
        :key="index"
        :class="{ selected: item.id === patienId }"
      >
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="id">{{ item.idCard.replace(/^(.{6})(?:\d+)(.{4})$/, '\$1******\$2') }}</span>
          <span class="sex">{{ item.gender ? '男' : '女' }}</span>
          <span class="age">{{ item.age }}岁</span>
        </div>
        <div class="icon" @click="showPopup(item)"><cp-icons name="user-edit"></cp-icons></div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>

      <div class="patient-add" @click="showPopup()" v-if="list && list?.length <= 6">
        <cp-icons name="user-add"></cp-icons>
        <p>添加患者</p>
      </div>

      <div class="patient-tip">最多可添加6人</div>
    </div>
    <!-- 右侧弹出 -->
    <van-popup v-model:show="show" position="right">
      <cp-nav-bar
        :back="backPopup"
        :title="patient.id ? '编辑患者' : '添加患者'"
        rightText="保存"
        @click-right="submit"
      ></cp-nav-bar>

      <van-form autocomplete="off">
        <van-field label="真实姓名" v-model="patient.name" placeholder="请输入真实姓名"></van-field>
        <van-field label="身份证号" v-model="patient.idCard" placeholder="请输入身份证号" />
        <van-field label="性别">
          <template #input>
            <cp-radio-btn :options="options" v-model="patient.gender"></cp-radio-btn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox round v-model="defaultFlag" />
          </template>
        </van-field>
      </van-form>

      <van-action-bar>
        <van-action-bar-button @click="remove">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>

    <!-- 底部按钮 -->
    <div class="patient-next">
      <van-button type="primary" @click="next" round block>下一步</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.patient-page {
  padding: 46px 0 80px;

  .patient-change {
    padding: 15px;
    > h3 {
      font-weight: normal;
      margin-bottom: 5px;
    }
    > p {
      color: var(--cp-text3);
    }
  }

  &-list {
    padding: 15px;
    .patient-item {
      background-color: var(--cp-bg);
      padding: 15px;
      border: 1px solid var(--cp-bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      overflow: hidden;
      position: relative;
      margin-bottom: 15px;
      &.selected {
        border-color: var(--cp-primary);
        background-color: var(--cp-plain);
      }

      .info {
        display: flex;
        flex: 1;
        flex-wrap: wrap;

        span {
          margin-right: 20px;
          line-height: 30px;
          color: var(--cp-tip);
          &.name {
            width: 60px;
            font-size: 16px;
            color: var(--cp-text1);
            // margin-right: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &.id {
            width: 180px;
            color: var(--cp-text1);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .icon {
        color: var(--cp-tag);
        width: 20px;
        text-align: center;
      }
      .tag {
        position: absolute;
        color: white;
        font-size: 10px;
        width: 30px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        background-color: var(--cp-primary);
        right: 60px;
        top: 21px;
      }
    }

    .patient-add {
      background-color: var(--cp-bg);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      color: var(--cp-primary);
      .cp-icon {
        font-size: 24px;
      }
    }

    .patient-tip {
      color: var(--cp-tag);
      padding: 12px 0;
    }
  }

  ::v-deep() {
    .van-popup {
      width: 100%;
      height: 100%;

      .van-form {
        padding-top: 46px;
      }

      // 底部操作栏
      .van-action-bar {
        padding: 0 10px;
        margin-bottom: 10px;
        .van-button {
          color: var(--cp-price);
          background-color: var(--cp-bg);
        }
      }
    }
  }

  .patient-next {
    padding: 15px;
    background-color: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
  }
}
</style>
