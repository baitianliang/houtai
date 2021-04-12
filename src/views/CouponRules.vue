<template>
    <!-- 优惠劵规则页面 -->
    <div id="Coupon-Rules">
        <div class="toolbar">
            <div class="search-form">
                <el-input
                    size="small"
                    placeholder="请输入店铺名称"
                    suffix-icon="el-icon-search"
                    v-model="Couponrules.searchForm.name">
                </el-input>
                <!-- <el-select
                    size="small"
                    v-model="Couponrules.searchForm.status"
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
                    @click="getPromoRuleList">查询</el-button>
            </div>
            <div class="search-form">
                <el-button
                    size="small"
                    type="primary"
                    @click="showDialog"
                    round>新 增</el-button>
            </div>
        </div>
        <div class="table-content">
            <div class="table-top">
                <div>
                    <img src="../assets/icon/couponReviewNum.png">
                    <div>
                        优惠劵规则总数:<span style="color: #FC8184">{{ total }}</span>
                    </div>
                </div>
            </div>
            <el-table
                :data="Couponrules.tableData"
                height="45vh"
                border>
                <el-table-column
                    prop="ruleName"
                    label="规则名称">
                </el-table-column>
                <el-table-column
                    prop="ruleCreateTime"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="ruleProfitAdd"
                    label="可否累加">
                    <template #default="scope">
                        <p>{{ scope.row.ruleProfitAdd ? '可以' : '不可以' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleUserLimitType"
                    label="用户限制">
                    <template #default="scope">
                        <p>{{ typeShowLabel(userLimitTypeList, scope.row.ruleUserLimitType) }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="targetLimitTypeList"
                    label="产品限制">
                    <template #default="scope">
                        <p>{{ typeShowLabel(targetLimitTypeList, scope.row.ruleTargetLimitType) }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleProfitType"
                    label="优惠规则">
                    <template #default="scope">
                        <p>{{ typeShowLabel(ruleProfitTypeList, scope.row.ruleProfitType) }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleProfitNeed"
                    label="优惠资源达成条件(元)">
                    <template #default="scope">
                        <p>{{ scope.row.ruleProfitNeed / 100 }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleProfitGift"
                    label="优惠资源给与数量(元)">
                    <template #default="scope">
                        <p>{{ scope.row.ruleProfitGift / 100 }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleProfitSupply"
                    label="优惠补充">
                    <template #default="scope">
                        <p>{{ scope.row.ruleProfitSupply ? scope.row.ruleProfitSupply : '无' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ruleStatus"
                    label="规则状态">
                    <template #default="scope">
                        <p>{{ scope.row.ruleStatus === 'active' ? '可用' : '不可用' }}</p>
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
        <el-dialog title="新增规则" v-model="dialogFormVisible" v-if="dialogFormVisible" width="600px">
            <el-form :model="addForm.form" label-width="150px">
                <el-form-item label="规则名称">
                    <el-input v-model="addForm.form.ruleName" placeholder="请输入规则名称" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="限制用户">
                    <el-select v-model="addForm.form.ruleUserLimitType" placeholder="请选择活动区域">
                        <el-option
                            v-for="(item, index) in userLimitTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="限制区域">
                    <el-select v-model="addForm.form.ruleTargetLimitType" placeholder="请选择活动区域">
                        <el-option
                            v-for="(item, index) in targetLimitTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则内容">
                    <el-select v-model="addForm.form.ruleProfitType" placeholder="请选择活动区域">
                        <el-option
                            v-for="(item, index) in ruleProfitTypeList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="需满金额">
                    <el-input v-model="addForm.form.ruleProfitNeed" placeholder="请输入需满金额" autocomplete="off">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="优惠金额">
                    <el-input v-model="addForm.form.ruleProfitGift" placeholder="请输入优惠金额" autocomplete="off">
                        <template #append>元</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="couponRuleAdd">确 定</el-button>
                </span>
            </template>
        </el-dialog>
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
                label: '代金卷',
                value: 'cash_coupon'
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
            },{
                label: '反券',
                value: 'gift_coupon'
            }],
        }
    },
    setup() {
        let { page, size, total, Couponrules, handleCurrentChange, getPromoRuleList, typeShowLabel } = getTableData()
        let { dialogFormVisible, addForm, showDialog, couponRuleAdd, closeDialog } = added(page, getPromoRuleList)
        onMounted(() => {
            getPromoRuleList()
        })
        return {
            page,
            size,
            total,
            dialogFormVisible,
            addForm,
            Couponrules,
            getPromoRuleList,
            handleCurrentChange,
            typeShowLabel,
            showDialog,
            couponRuleAdd,
            closeDialog
        }
    }
}
// 新增
function added(page, getPromoRuleList) {
    let dialogFormVisible = ref(false)
    const addForm = reactive({
        form: {
            ruleName: '',
            ruleUserLimitType: '',
            ruleTargetLimitType: '',
            ruleProfitType: '',
            ruleProfitNeed: '',
            ruleProfitGift: ''
        }
    })
    function showDialog() {
        dialogFormVisible.value = true
    }
    function couponRuleAdd() {
        if (!addForm.form.ruleName) return open('error', '请输入规则名称')
        if (!addForm.form.ruleUserLimitType) return open('error', '请选择限制用户')
        if (!addForm.form.ruleTargetLimitType) return open('error', '请选择限制区域')
        if (!addForm.form.ruleProfitType) return open('error', '请选择规则内容')
        if (!addForm.form.ruleProfitNeed) return open('error', '请输入需满金额')
        if (!addForm.form.ruleProfitGift) return open('error', '请输入优惠金额')
        const form = { ...addForm.form }
        form.ruleProfitNeed = form.ruleProfitNeed * 100
        form.ruleProfitGift = form.ruleProfitGift * 100
        axios.addPromoRule(form)
        .then(res => {
            if(res && res.data && res.data.status === 0) {
                open('success', '添加成功')
                page.value = 1
                getPromoRuleList()
                closeDialog()
            }
        })
    }
    function closeDialog() {
        dialogFormVisible.value = false
        addForm.form = {
            name: '',
            region: ''
        }
    }
    return {
        dialogFormVisible,
        addForm,
        showDialog,
        couponRuleAdd,
        closeDialog
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
    const Couponrules = reactive({
        searchForm: {
            name: '',
            status: ''
        },
        tableData: []
    })
    function getPromoRuleList() {
        axios.getPromoRuleList((page.value - 1) * size, size)
        .then(({data}) => {
            if(data.status === 0) {
                Couponrules.tableData = data.result
                total.value = data.totalCount
                console.log(data.result)
            }
        })
    }
    function handleCurrentChange(val) {
        page.value = val
        getPromoRuleList()
    }
    return {
        page,
        size,
        total,
        Couponrules,
        getPromoRuleList,
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
