<template>
    <!-- vip管理页面 -->
    <div id="VipManage">
        <div class="toolbar">
            <div class="search-form">
                <el-input
                    size="small"
                    placeholder="请输入店铺名称"
                    suffix-icon="el-icon-search"
                    v-model="vip.searchForm.name">
                </el-input>
                <!-- <el-date-picker
                    size="small"
                    v-model="vip.searchForm.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker> -->
                <el-button
                    size="small"
                    type="primary"
                    @click="getVipConfigurationList">查询</el-button>
            </div>
            <el-button
                size="small"
                type="primary"
                round
                @click="addVipConfiguration">新 建</el-button>
        </div>
        <div class="table-content">
            <div class="table-top">
                <div>
                    <img src="../assets/icon/openNum.png">
                    <div>
                        vip配置总数:<span style="color: #FC8184">{{ total }}</span>
                    </div>
                </div>
            </div>
            <el-table
                :data="vip.tableData"
                height="45vh"
                border>
                <el-table-column
                    prop="vipCfgId"
                    label="vip编号">
                </el-table-column>
                <el-table-column
                    prop="vipCfgLevel"
                    label="vip级别">
                </el-table-column>
                <el-table-column
                    prop="vipCfgPrice"
                    label="vip价格(元)">
                    <template #default="scope">
                        <p>{{ scope.row.vipCfgPrice ? scope.row.vipCfgPrice / 100 : '' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="vipCfgDuration"
                    label="vip持续时间(月)">
                </el-table-column>
                <el-table-column
                    prop="vipCfgStatus"
                    label="vip状态">
                    <template #default="scope">
                        <p>{{ scope.row.vipCfgStatus === 'active' ? '可用' : '不可用' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template #default="scope">
                        <el-button
                            type="text"
                            size='mini'
                            @click="showDetails(scope.row)">
                            修改配置
                        </el-button>
                        <!-- 店铺状态 -->
                        <el-button
                            type="text"
                            size='mini'
                            :style="scope.row.vipCfgStatus === 'active' ? 'color: #f56c6c' : ''"
                            @click="operateRow(scope.row)">
                            <!-- <span v-if="scope.row.vipCfgStatus === 'active'">冻结账户</span>
                            <span v-else-if="scope.row.vipCfgStatus === 'inactive'">审核通过</span>
                            <span v-else>解冻账户</span> -->
                            {{ scope.row.vipCfgStatus === 'active' ? '下架配置' : '上架配置'}}
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
        <el-dialog :title="dialogTitle" v-model="dialogFormVisible" v-if="dialogFormVisible" width="600px">
            <el-form :model="vip.dialogForm" label-width="100px">
                <el-form-item label="vip价格(元)">
                    <el-input
                        v-model="vip.dialogForm.vipCfgPrice"
                        placeholder="请输入vip价格"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="持续时间(月)">
                    <el-input
                        v-model="vip.dialogForm.vipCfgDuration"
                        placeholder="请输入持续时间"
                        autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="operationVipCfgDuration">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from '../assets/axios/VipManage'
import { ref,reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
export default {
    setup() {
        onMounted(() => {
            getVipConfigurationList()
        })
        let page = ref(1),
        size = 20,
        total = ref(0),
        dialogTitle = ref(''),
        dialogFormVisible = ref(false),
        vip = reactive({
            searchForm: {
                name: '',
                date: ''
            },
            tableData: [],
            dialogForm: {
                vipCfgPrice: '',
                vipCfgDuration: ''
            }
        })
        function handleCurrentChange(val) {
            page.value = val
            getVipConfigurationList()
        }
        function getVipConfigurationList() {
            axios.getVipConfigurationList((page.value - 1) * size, size)
            .then(({data}) => {
                if(data.status === 0) {
                    vip.tableData = data.result
                    total.value = data.totalCount
                    console.log(data.result)
                }
            })
        }
        function addVipConfiguration() {
            dialogTitle.value = '新增配置'
            dialogFormVisible.value = true
        }
        function showDetails(val) {
            dialogTitle.value = '修改配置'
            vip.dialogForm = { ...val }
            vip.dialogForm.vipCfgPrice = vip.dialogForm.vipCfgPrice / 100
            dialogFormVisible.value = true
        }
        function closeDialog() {
            vip.dialogForm = {
                vipCfgPrice: '',
                vipCfgDuration: ''
            }
            dialogFormVisible.value = false
        }
        function operationVipCfgDuration() {
            if(dialogTitle.value === '新增配置') {
                vip.dialogForm.vipCfgPrice = vip.dialogForm.vipCfgPrice * 100
                axios.addVipConfiguration(vip.dialogForm)
                .then(res => {
                    if(res.data.status === 0) {
                        open('success', '新增成功')
                        getVipConfigurationList()
                        closeDialog()
                    }
                })
                .catch(err => {
                    // open('error', '命名重复')
                })
            } else {
                vip.dialogForm.vipCfgPrice = vip.dialogForm.vipCfgPrice * 100
                axios.updateVipConfiguration(vip.dialogForm)
                .then(res => {
                    if(res.data.status === 0) {
                        open('success', '修改成功')
                        getVipConfigurationList()
                        closeDialog()
                    }
                })
                .catch(err => {
                    // open('error', '命名重复')
                })
            }
        }
        function operateRow(val) {
            if(val.vipCfgStatus === 'active') {
                axios.offVipConfiguration(val.vipCfgId)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        open('success', '已下架')
                        getVipConfigurationList()
                    }
                })
            } else {
                axios.onVipConfiguration(val.vipCfgId)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        open('success', '已上架')
                        getVipConfigurationList()
                    }
                })
            }
        }
        return {
            page,
            size,
            total,
            vip,
            dialogTitle,
            dialogFormVisible,
            handleCurrentChange,
            getVipConfigurationList,
            addVipConfiguration,
            showDetails,
            closeDialog,
            operationVipCfgDuration,
            operateRow
        }
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
#VipManage {
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
}
</style>
