<template>
    <!-- 优惠劵规则页面 -->
    <div id="Coupon-Rules">
        <div class="toolbar">
            <div class="search-form">
                <el-input
                    size="small"
                    placeholder="请输入店铺名称"
                    suffix-icon="el-icon-search"
                    v-model="couponRules.searchForm.name">
                </el-input>
                <!-- <el-select
                    size="small"
                    v-model="couponRules.searchForm.status"
                    placeholder="请选择审核状态">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.title"
                        :value="item.value">
                    </el-option>
                </el-select> -->
                <el-button
                    size="small"
                    type="primary"
                    @click="getPromoCouponList">查询</el-button>
            </div>
            <!-- <div class="search-form">
                <el-button
                    size="small"
                    type="primary"
                    @click="showDialog"
                    round>新 增</el-button>
            </div> -->
        </div>
        <div class="table-content">
            <div class="table-top">
                <div>
                    <img src="../assets/icon/couponReviewNum.png">
                    <div>
                        优惠劵总数:<span style="color: #FC8184">{{ total }}</span>
                    </div>
                </div>
            </div>
            <el-table
                :data="couponRules.tableData"
                height="45vh"
                border>
                <el-table-column
                    prop="couponVenderId"
                    label="优惠券所属商家id"
                    width="170px">
                </el-table-column>
                <el-table-column
                    prop="couponCreateTime"
                    label="创建时间">
                    <template #default="scope">
                        <p>{{ scope.row.couponCreateTime ? scope.row.couponCreateTime.substring(0, 10) : '' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleName"
                    label="优惠劵规则">
                </el-table-column>
                <el-table-column
                    prop="couponStartTime"
                    label="生效时间">
                    <template #default="scope">
                        <p>{{ scope.row.couponStartTime ? scope.row.couponStartTime.substring(0, 10) : '' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="couponEndTime"
                    label="失效时间">
                    <template #default="scope">
                        <p>{{ scope.row.couponEndTime ? scope.row.couponEndTime.substring(0, 10) : '' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="couponMaxCount"
                    label="可发放数量">
                </el-table-column>
                <el-table-column
                    prop="couponAllocCount"
                    label="已发放数量">
                </el-table-column>
                <el-table-column
                    prop="couponPerGet"
                    label="单人最大持有数量">
                    <template #default="scope">
                        <p>{{ scope.row.couponPerGet === 0 ? '无限' : scope.row.couponPerGet }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="couponPerUse"
                    label="单笔消费可使用数量">
                </el-table-column>
                <el-table-column
                    prop="couponTotalGet"
                    label="单人最大领取数量">
                    <template #default="scope">
                        <p>{{ scope.row.couponTotalGet === 0 ? '无限' : scope.row.couponTotalGet }}</p>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    prop="couponDesc"
                    label="描述">
                    <template #default="scope">
                        <p>{{ !scope.row.couponDesc ? '无' : scope.row.couponDesc }}</p>
                    </template>
                </el-table-column> -->
                <el-table-column
                    prop="couponStatus"
                    label="使用状态">
                    <template #default="scope">
                        <p>{{ scope.row.couponStatus === 'active' ? '可用' : '不可用' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template #default="scope">
                        <el-button
                            type="text"
                            size='mini'
                            :style="scope.row.couponStatus === 'active' ? 'color: #f56c6c' : ''"
                            @click="operateRow(scope.row)">
                            {{ scope.row.couponStatus === 'active' ? '禁用' : '激活' }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="size"
                prev-text=""
                next-text=""
                layout="prev, pager, next, slot, jumper"
                :total="total">
                <template v-slot>
                    <span style="color: #808080">
                        共{{ Math.ceil(total/size) }}页
                    </span>
                </template>
            </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from '../assets/axios/Coupon'
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            // options: [{
            //     title: '全部',
            //     value: 0
            // }, {
            //     title: '待审核',
            //     value: 1
            // }, {
            //     title: '已审核',
            //     value: 2
            // }]
            // 用户限制类型列表
            userLimitTypeList: [{
                label: '无限制',
                value: 'unlimited'
            },{
                label: '首次购物',
                value: 'first'
            },{
                label: '指定会员等级',
                value: 'membership'
            },{
                label: '等于或高于该会员等级',
                value: 'membership_gte'
            },{
                label: '指定会员分组',
                value: 'group'
            },{
                label: '指定区域（根据IP判断）',
                value: 'region'
            }],
            // 产品限制类型列表
            targetLimitTypeList: [{
                label: '无限制',
                value: 'unlimited'
            },{
                label: '基于整单',
                value: 'total'
            },{
                label: '指定产品',
                value: 'product'
            },{
                label: '指定产品SKU',
                value: 'product_sku'
            },{
                label: '指定产品目录',
                value: 'category'
            }],
            // 优惠规则列表
            ruleProfitTypeList: [{
                label: '代金券',
                value: 'gift_coupon'
            },{
                label: '金额满减金额',
                value: 'money_saved'
            },{
                label: '满减百分比',
                value: 'money_percent'
            },{
                label: '特价',
                value: 'money_special'
            },{
                label: '运费满减金额',
                value: 'shipping_saved'
            },{
                label: '运费满减百分比',
                value: 'shipping_percent'
            },{
                label: '积分增加固定值',
                value: 'point_add'
            },{
                label: '积分乘与倍数',
                value: 'point_multiple'
            },{
                label: '产品购买资格（n选1，价格为空表示赠送）',
                value: 'gift_product_nto1'
            },{
                label: '产品购买资格（n选m）',
                value: 'gift_product_ntom'
            },{
                label: '礼品卡',
                value: 'gift_card'
            }],
        }
    },
    setup() {
        let { page, size, total, couponRules, handleCurrentChange, getPromoCouponList, typeShowLabel } = getTableData()
        onMounted(() => {
            getPromoCouponList()
        })
        function operateRow(val) {
            if(val.couponStatus === 'active') {
                axios.offPromoCoupon(val.couponId)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        open('success', '已禁用')
                        getPromoCouponList()
                    }
                })
            } else {
                axios.onPromoCoupon(val.couponId)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        open('success', '已激活')
                        getPromoCouponList()
                    }
                })
            }
        }
        return {
            page,
            size,
            total,
            couponRules,
            getPromoCouponList,
            handleCurrentChange,
            typeShowLabel,
            operateRow
        }
    }
}
// 查询
function getTableData() {
    let page = ref(1), size = 20 ,total = ref(0)
    const typeShowLabel = computed(() => {
        return (list, val) => {
            if (!val) return ''
            return list.filter(el => el.value === val)[0].label
        }
    })
    const couponRules = reactive({
        searchForm: {
            name: '',
            status: ''
        },
        tableData: []
    })
    function getPromoCouponList() {
        axios.getPromoCouponList((page.value - 1) * size, size)
        .then(({data}) => {
            if(data.status === 0) {
                couponRules.tableData = data.result
                total.value = data.totalCount
                console.log(data.result)
            }
        })
    }
    function handleCurrentChange(val) {
        page.value = val
        getPromoCouponList()
    }
    return {
        page,
        size,
        total,
        couponRules,
        getPromoCouponList,
        handleCurrentChange,
        typeShowLabel,
    }
}

function open(type, message) {
    ElMessage({
        showClose: true,
        message,
        type
    });
}
</script>

<style lang="scss">
#Coupon-Rules {
    background-color: #fff;
    margin: 20px;
    min-height: 80vh;
    height: auto;
    .table-content {
        margin: 30px;
        .table-top {
            display: flex;
            margin-bottom: 30px;
            > div {
                display: flex;
                align-items: center;
                margin-right: 60px;
                img {
                    height: 35px;
                    width: 35px;
                    margin-right: 15px;
                }
            }
        }
        .el-pagination {
            margin-top: 20px;
        }
    }
    .el-form-item__content {
        .el-input {
            width: 300px;
        }
    }
}
</style>
