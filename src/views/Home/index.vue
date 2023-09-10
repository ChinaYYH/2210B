<script setup lang="ts">
import KnowledgeList from './components/KnowledgeList.vue'
import { ref } from 'vue'
import type { KnowledgeType } from '@/types/consult.d.ts'
import FollowDoctor from './components/FollowDoctor.vue'
import { useConsultStore } from '@/stores/consult'
import { ConsultType } from '@/enum'

const active = ref<KnowledgeType>('recommend')
const store = useConsultStore()
</script>

<template>
  <div class="home-page">
    <div class="home-page-header">
      <div class="con">
        <h1>优医</h1>
        <div class="search">
          <cp-icons name="home-search"></cp-icons> 搜一搜：疾病/症状/医生/健康知识
        </div>
      </div>
    </div>
    <div class="home-page-navs">
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icons name="home-doctor"></cp-icons>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/consult/fast" class="nav" @click="store.setType(ConsultType.Fast)">
            <cp-icons name="home-graphic"></cp-icons>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icons name="home-prescribe"></cp-icons>
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icons name="home-order"></cp-icons>
            <p class="title">问医生</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icons name="home-docs"></cp-icons>
            <p class="title">极速问诊</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icons name="home-rp"></cp-icons>
            <p class="title">开药门诊</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icons name="home-find"></cp-icons>
            <p class="title">开药门诊</p>
          </router-link>
        </van-col>
      </van-row>
    </div>
    <div class="home-page-banner">
      <van-swipe indicator-color="#fff">
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="@/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-tabs sticky shrink v-model:active="active">
      <van-tab name="like" title="关注">
        <FollowDoctor></FollowDoctor>
        <KnowledgeList type="like"></KnowledgeList>
      </van-tab>
      <van-tab name="recommend" title="推荐">
        <KnowledgeList type="recommend"></KnowledgeList>
      </van-tab>
      <van-tab name="fatReduction" title="减脂">
        <KnowledgeList type="fatReduction"></KnowledgeList>
      </van-tab>
      <van-tab name="food" title="饮食">
        <KnowledgeList type="fatReduction"></KnowledgeList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  padding-bottom: 50px;

  &-header {
    height: 100px;
    position: relative;

    &:before {
      content: '';
      width: 100%;
      height: 90px;
      background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
      position: absolute;
      left: 0;
      top: 0;
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }

    .con {
      padding: 0 15px;
      position: relative;

      > h1 {
        font-size: 18px;
        color: #fff;
        font-weight: normal;
        padding: 20px 0;
        line-height: 1;
        padding-left: 5px;
      }

      .search {
        height: 40px;
        border-radius: 20px;
        background-color: #fff;
        box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
        display: flex;
        align-items: center;
        padding: 0 20px;
        color: var(--cp-dark);
        font-size: 13px;

        .cp-icon {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
  }

  &-navs {
    padding: 10px 15px 0 15px;

    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0;

      .cp-icon {
        font-size: 48px;
      }

      .title {
        font-weight: 500;
        margin-top: 5px;
        color: var(--cp-text1);
      }

      .desc {
        font-size: 11px;
        color: var(--cp-tag);
        margin-top: 2px;
      }
    }

    .min {
      .cp-icon {
        font-size: 31px;
      }

      .title {
        color: var(--cp-text2);
        font-size: 13px;
        font-weight: normal;
      }
    }
  }

  &-banner {
    padding: 10px 15px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
