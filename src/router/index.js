
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import MemberBill from '../views/MemberBill.vue'
import Tensong from '../views/Tensong.vue'
import CouponRules from '../views/CouponRules.vue'
import CouponReview from '../views/CouponReview.vue'
import UsersList from '../views/UsersList.vue'
import ProductControl from '../views/ProductControl.vue'
import OrderManagement from '../views/OrderManagement.vue'
import VipManage from '../views/VipManage.vue'

const routerHistory = createWebHashHistory()
// createWebHashHistory hash 路由
// createWebHistory history 路由
// createMemoryHistory 带缓存 history 路由
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/MemberBill'
    },{
      path: '/Login',
      name: '登录',
      component: Login
    },
    // 会员账单
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
          path: '/VipManage',
          name: 'vip配置',
          component: VipManage
        }, {
          path: '/MemberBill',
          name: '会员账单',
          component: MemberBill
        }, {
          path: '/Tensong',
          name: '店铺数据',
          component: Tensong
        }, {
          path: '/CouponRules',
          name: '优惠劵规则',
          component: CouponRules
        }, 
        {
          path: '/CouponReview',
          name: '优惠劵列表',
          component: CouponReview
        },
        {
          path: '/UsersList',
          name: '用户列表',
          component: UsersList
        },
        {
          path: '/ProductControl',
          name: '产品管理',
          component: ProductControl
        },
        {
          path: '/OrderManagement',
          name: '订单管理',
          component: OrderManagement
        },
        
      ]
    },
    // {
    //   path: '/register',
    //   component: register
    // },
  ]
})
 
export default router