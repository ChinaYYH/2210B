import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/indexCopy.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register/index.vue')
    },
    {
      path: '/user/patient',
      name: 'patient',
      component: () => import('../views/User/PatientPage.vue'),
      meta: { title: '家庭档案' }
    },
    {
      path: '/consult/fast',
      name: 'fast',
      component: () => import('../views/Consult/ConsultFast.vue'),
      meta: { title: '极速问诊' }
    },
    {
      path: '/user/consult',
      name: 'consult',
      component: () => import('../views/User/ConsultPage.vue'),
      meta: { title: '问诊记录' }
    },
    {
      path: '/order/pay',
      name: 'orderPay',
      component: () => import('../views/Order/OrderPay.vue'),
      meta: { title: '药品支付' }
    },
    {
      path: '/user/consult/:id',
      name: 'detail',
      component: () => import('../views/User/ConsultDetail.vue'),
      meta: { title: '问诊详情' }
    },
    {
      path: '/consult/dep',
      name: 'dep',
      component: () => import('../views/Consult/ConsultDep.vue'),
      meta: { title: '选择科室' }
    },
    {
      path: '/consult/illness',
      name: 'illness',
      component: () => import('../views/Consult/ConsultIllness.vue'),
      meta: { title: '病情描述' }
    },
    {
      path: '/consult/pay',
      name: 'pay',
      component: () => import('../views/Consult/ConsultPay.vue'),
      meta: { title: '问诊支付' }
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('../views/Room/index.vue'),
      meta: { title: '问诊室' }
    },
    {
      path: '/order/pay/result',
      name: 'orderPayResult',
      component: () => import('../views/Order/OrderPayResult.vue'),
      meta: { title: '药品支付结果' }
    },
    {
      path: '/order/:id',
      name: 'orderDetail',
      component: () => import('../views/Order/OrderDetail.vue'),
      meta: { title: '药品订单详情' }
    },
    {
      path: '/order/logistics/:id',
      name: 'orderLogistics',
      component: () => import('../views/Order/OrderLogistics.vue'),
      meta: { title: '物流详情' }
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('../views/Article/index.vue'),
          meta: {
            title: '健康百科'
          }
        },
        {
          path: '/notify',
          name: 'notify',
          component: () => import('../views/Notify/index.vue'),
          meta: {
            title: '消息通知'
          }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User/index.vue'),
          meta: {
            title: '个人中心'
          }
        }
      ]
    }
  ]
})

export default router
