<script setup lang="ts">
import { MsgType } from '@/enum'
import type { Image } from '@/types/consult'
import { getIllnessTimeText, getConsultFlagText } from '@/utils/filter'
import { showImagePreview } from 'vant'
defineProps<{
  list: Message[]
}>()

// 点击查看患者图片
const previewImg = (pictures?: Image[]) => {
  if (pictures && pictures.length > 0) {
    showImagePreview(pictures.map((item) => item.url))
  }
}
</script>

<template>
  <div class="room-message">
    <template v-for="(item, index) in list" :key="index">
      <!-- 消息时间 -->
      <!-- 通知-通用 -->
      <!-- <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
        <div class="content">
          {{ item.msg.content }}
        </div>
      </div> -->

      <!-- 患者卡片 -->
      <div class="msg msg-illness" v-if="item.msgType === MsgType.CardPat">
        <div class="patient van-hairline--bottom">
          <p>
            {{ item.msg.consultRecord.patientInfo.name }}
            {{ item.msg.consultRecord.patientInfo.genderValue }}
            {{ item.msg.consultRecord.patientInfo.age }}岁
          </p>
          <p>
            {{ getIllnessTimeText(item.msg.consultRecord.patientInfo.illnessTime) }} |
            {{ getConsultFlagText(item.msg.consultRecord.patientInfo.illnessType) }}
          </p>
        </div>
        <van-row>
          <van-col span="6">病情描述</van-col>
          <van-col span="18">{{ item.msg.consultRecord.illnessDesc }}</van-col>
          <van-col span="6">图片</van-col>
          <van-col span="18" @click="previewImg(item.msg.consultRecord.pictures)">点击查看</van-col>
        </van-row>
      </div>
      <!-- 通知-通用 -->
      <div class="msg msg-tip" v-if="item.msgType === MsgType.Notify">
        <div class="content">
          <span>{{ item.msg.content }}</span>
        </div>
      </div>
      <!-- 通知-温馨提示 -->
      <div class="msg msg-tip" v-if="item.msgType === MsgType.NotifyTip">
        <div class="content">
          <span class="green">温馨提示：</span>
          <span>{{ item.msg.content }}</span>
        </div>
      </div>
      <!-- 通知-结束 -->
      <div class="msg msg-tip msg-tip-cancel" v-if="item.msgType === 33">
        <div class="content">
          <span>订单取消</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.createTime {
  // margin-top: 40px;
  background-color: #fff;
  width: 150px;
  margin: 0 auto 30px;
  padding: 10px;
  font-size: 12px;
  color: var(--cp-tag);
  border-radius: 20px;
  text-align: center;
}
.msg {
  display: flex;
  padding: 15px;

  &-illness {
    display: block;
    background-color: #fff;
    margin: 15px;
    border-radius: 8px;
    font-size: 12px;

    .patient {
      padding-bottom: 15px;
      margin-bottom: 15px;
      > p {
        &:first-child {
          font-size: 16px;
        }
        &:last-child {
          margin-top: 5px;
          color: var(--cp-tip);
        }
      }
    }

    .van-col {
      &:nth-child(-n + 2) {
        margin-bottom: 5px;
      }
      &:nth-child(2n) {
        color: var(--cp-tip);
      }
    }
  }

  &-tip {
    justify-content: center;
    font-size: 12px;
    .content {
      height: 34px;
      line-height: 34px;
      background-color: #fff;
      color: var(--cp-tip);
      font-size: 12px;
      border-radius: 17px;
      padding: 0 16px;
      max-width: 100%;
      .green {
        color: var(--cp-primary);
      }
    }
    &-cancel {
      .content {
        background-color: #ededed;
      }
    }
  }
}
</style>
