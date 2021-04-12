<template>
  <div id="b-hav">
    <el-menu
      :uniqueOpened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      text-color="#fff"
      active-text-color="#fff"
      router>
      <el-menu-item
        v-for="(item, index) in havList"
        :key="index"
        :index="item.url"
        style="padding-left: 20%">
        <!-- <i :class="item.icon"></i> -->
        <img :src="item.icon" alt="">
        <template #title style="">{{ item.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      havList: [
        {
          title: 'vip配置',
          url: '/VipManage',
          icon: require('../../assets/icon/huiyuanzhangdan.png')
        },
        // {
        //   title: '会员账单',
        //   url: '/MemberBill',
        //   icon: require('../../assets/icon/huiyuanzhangdan.png')
        // },
        {
          title: '店铺数据',
          url: '/Tensong',
          icon: require('../../assets/icon/dianpushuju.png')
        },
        {
          title: '优惠劵规则',
          url: '/CouponRules',
          icon: require('../../assets/icon/youhuijuanshenhe.png')
        },
        {
          title: '优惠劵列表',
          url: '/CouponReview',
          icon: require('../../assets/icon/youhuijuanshenhe.png')
        },
        // {
        //   title: '订单管理',
        //   url: '/OrderManagement',
        //   icon: require('../../assets/icon/dingdanguanli.png')
        // },
        // {
        //   title: '小程序管理',
        //   url: '/',
        //   icon: require('../../assets/icon/xiaochengxuguanli.png')
        // },
        // {
        //   title: '协议管理',
        //   url: '/',
        //   icon: require('../../assets/icon/xieyiguanli.png')
        // },
        // {
        //   title: '信息通知',
        //   url: '/',
        //   icon: require('../../assets/icon/xinxitongzhi.png')
        // },
        {
          title: '用户列表',
          url: '/UsersList',
          icon: require('../../assets/icon/yonghuliebiao.png')
        },
        {
          title: '产品管理',
          url: '/ProductControl',
          icon: require('../../assets/icon/chanpinguanli.png')
        },
        // {
        //   title: '数据统计',
        //   url: '/',
        //   icon: require('../../assets/icon/shujutongji.png')
        // },
      ]
    }
  }
}
</script>

<style lang="scss">
#b-hav {
  .el-menu {
    min-height: 92vh;
    // padding: 20px 0px;
    padding-bottom: auto;
    background: linear-gradient(#406DE2, #36349F);
    img {
      height: 20px;
      width: 20px;
      margin-right: 1.5rem;
      margin-bottom: 3px;
    }
    .el-menu-item {
      // display: flex;
      text-align: left;
      font-size: 18px;
      background-color: transparent;
    }
    // .el-menu-item:focus, .el-menu-item:hover {
    //   opacity: 0.9
    // }
    .el-menu-item:first-child {
      margin-top: 20px;
    }
    .el-menu-item:last-child {
      margin-bottom: 20px;
    }
  }
}
</style>