<template>
    <!-- 店铺数据页面 -->
    <div id="Tensong">
        <div class="toolbar">
            <div class="search-form">
                <el-input
                    size="small"
                    placeholder="请输入店铺名称"
                    suffix-icon="el-icon-search"
                    v-model="tensong.searchForm.name">
                </el-input>
                <el-select
                    size="small"
                    v-model="tensong.searchForm.status"
                    placeholder="请选择审核状态">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.title"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button
                    size="small"
                    type="primary"
                    @click="getVenderList">查询</el-button>
            </div>
            <div class="search-form">
                <el-button
                    size="small"
                    type="primary"
                    round>发送消息</el-button>
                <el-button
                    size="small"
                    type="primary"
                    round>导 出</el-button>
            </div>
        </div>
        <div class="table-content">
            <div class="table-top">
                <div>
                    <img src="../assets/icon/storeNum.png">
                    <div>
                        店铺总数:<span style="color: #FC8184">{{ total }}</span>
                    </div>
                </div>
            </div>
            <el-table
                :data="tensong.tableData"
                height="45vh"
                border>
                <el-table-column
                    prop="venderName"
                    label="店铺名称">
                </el-table-column>
                <el-table-column
                    prop="venderProfitTrueName"
                    label="店铺所属人">
                </el-table-column>
                <el-table-column
                    prop="venderMobileId"
                    label="所属人手机号">
                </el-table-column>
                <el-table-column
                    prop="venderMobileId"
                    label="所属地区">
                    <template #default="scope">
                        <p>{{ `${scope.row.provinceName}-${scope.row.cityName}-${scope.row.districtName}` }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="venderAddr"
                    label="详细地址">
                </el-table-column>
                <el-table-column
                    prop="venderStatus"
                    label="店铺状态">
                    <template #default="scope">
                        <span v-if="scope.row.venderStatus === 'active'">可用</span>
                        <span v-else-if="scope.row.venderStatus === 'inactive'">未审核</span>
                        <span v-else>已冻结</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="venderProfitStatus"
                    label="分账状态">
                    <template #default="scope">
                        <p>{{ scope.row.venderProfitStatus === 'active' ? '已添加' : '未添加' }}</p>
                    </template>
                </el-table-column>
                
                <el-table-column
                    label="操作">
                    <template #default="scope">
                        <el-button
                            type="text"
                            size='mini'
                            @click="showDetails(scope.row)">
                            查看详情
                        </el-button>
                        <!-- 店铺状态 -->
                        <el-button
                            type="text"
                            size='mini'
                            :style="scope.row.venderStatus === 'active' ? 'color: #f56c6c' : ''"
                            @click="operateRow(scope.row)">
                            <span v-if="scope.row.venderStatus === 'active'">冻结账户</span>
                            <span v-else-if="scope.row.venderStatus === 'inactive'">审核通过</span>
                            <span v-else>解冻账户</span>
                        </el-button>
                        <!-- 更新权限 -->
                        <!-- <el-button
                            type="text"
                            size='mini'
                            @click="utilLogoutOther(scope.row)">
                            更新权限
                        </el-button> -->
                        <!-- 分账状态 -->
                        <!-- <el-button
                            type="text"
                            size='mini'
                            :style="scope.row.venderProfitStatus === 'active' ? 'color: #f56c6c' : ''"
                            @click="subAccount(scope.row)">
                            {{ scope.row.venderProfitStatus === 'active' ? '删除分账' : '添加分账' }}
                        </el-button> -->
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
        <el-dialog title="店铺详情" v-model="dialogFormVisible" v-if="dialogFormVisible" width="1000px">
            <div class="store-detail">
                <div>
                    <img :src="tensong.detialForm.venderAvatar" alt="">
                    <div>店铺名称:<span>{{ tensong.detialForm.venderName }}</span></div>
                    <div>所在区域:<span>{{ `${tensong.detialForm.provinceName}/${tensong.detialForm.cityName}/${tensong.detialForm.districtName}` }}</span></div>
                    <div>详细地址:<span>{{ tensong.detialForm.venderAddr }}</span></div>
                    <div>联系方式:<span>{{ tensong.detialForm.venderMobileId }}</span></div>
                    <div>联系人:<span>{{ tensong.detialForm.venderProfitTrueName }}</span></div>
                    <div class="pic-group">
                        <div>
                            <img :src="tensong.detialForm.venderConf.authorization" alt="">
                            <div>营业执照</div>
                        </div>
                        <div>
                            <img :src="tensong.detialForm.venderConf.licensePic" alt="">
                            <div>授权书</div>
                        </div>
                    </div>
                </div>
                <div class="vertical"></div>
                <div>
                    <div class="title">店铺介绍</div>
                    <div class="content-text"><span>{{ tensong.detialForm.venderDesc }}</span></div>
                    <div class="title">门店照片</div>
                    <div class="content-img">
                        <img
                            v-for="item in tensong.detialForm.venderConf.photoPic"
                            :key="item"
                            :src="item"
                            alt="">
                    </div>
                    <div class="title">营业状态:{{ tensong.detialForm.venderIsLeaf === 'active' ? '正在营业' : '未营业' }}</div>
                </div>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="closeDialog">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from '../assets/axios/Tensong'
import { ref,reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
export default {
    data() {
        return {
            options: [{
                title: '全部',
                value: 0
            }, {
                title: '待审核',
                value: 1
            }, {
                title: '已审核',
                value: 2
            }]
        }
    },
    setup() {
        onMounted(() => {
            getVenderList()
        })
        let page = ref(1), size = 20 ,total = ref(0), dialogFormVisible = ref(false)
        const tensong = reactive({
            searchForm: {
                name: '',
                status: ''
            },
            tableData: [],
            detialForm: {}
        })
        function getVenderList() {
            axios.getVenderList((page.value - 1) * size, size)
            .then(({data}) => {
                if(data.status === 0) {
                    tensong.tableData = data.result
                    total.value = data.totalCount
                    console.log(data.result)
                }
            })
        }
        function handleCurrentChange(val) {
            page.value = val
            getVenderList()
        }
        function operateRow(val) {
            if(val.venderStatus === 'active') {
                axios.offVender(val.venderId)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        open('success', '已禁用')
                        getVenderList()
                        axios.utilLogoutOther(val.userName)
                    }
                })
            } else if (val.venderStatus === 'inactive') {
                axios.addVenderReceiver(val.venderId, val.venderLinker)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        axios.onVender(val.venderId)
                        .then(res => {
                            if (res && res.data && res.data.status === 0) {
                                open('success', '已激活')
                                getVenderList()
                                axios.utilLogoutOther(val.userName)
                            }
                        })
                    } else {
                        open('error', res.data.statusDesc)
                    }
                })
            } else {
                axios.recoverVender(val.venderId)
                .then(res => {
                    if (res && res.data && res.data.status === 0) {
                        open('success', '已激活')
                        getVenderList()
                        axios.utilLogoutOther(val.userName)
                    }
                })
            }
        }
        // function subAccount(val) {
        //     if(val.venderProfitStatus === 'active') {
        //         axios.deleteVenderReceiver(val.venderId)
        //         .then(res => {
        //             if (res && res.data && res.data.status === 0) {
        //                 open('success', '已删除分账')
        //                 getVenderList()
        //             }
        //         })
        //     }
        // }
        function showDetails(val) {
            axios.getVenderDetail(val.venderId)
            .then(res => {
                if(res && res.data && res.data.status === 0) {
                    tensong.detialForm = res.data.result
                    tensong.detialForm.venderConf = JSON.parse(tensong.detialForm.venderConf)
                    dialogFormVisible.value = true
                }
            })
        }
        // function utilLogoutOther(val) {
        //     axios.utilLogoutOther(val.userName)
        //     .then(res => {
        //         if (res && res.data && res.data.status === 0) {
        //             open('success', '已激活')
        //             getVenderList()
        //         }
        //     })
        // }
        function closeDialog() {
            dialogFormVisible.value = false
        }
        return {
            page,
            size,
            total,
            dialogFormVisible,
            tensong,
            handleCurrentChange,
            getVenderList,
            operateRow,
            // subAccount,
            showDetails,
            // utilLogoutOther,
            closeDialog
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
#Tensong {
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
    .el-dialog .el-dialog__header {
        border-bottom: 1px solid #eee;
    }
    .store-detail {
        width: 100%;
        display: flex;
        justify-content: space-between;
        > div {
            width: 50%;
            text-align: left;
            > div {
                color: #b6b6b6;
                margin-left: 20px;
                margin-top: 10px;
                > span {
                    color: #606266;
                    margin-left: 10px;
                }
            }
        }
        img {
            height: 50px;
            width: 50px;
            border-radius: 50%;
        }
        .vertical {
            width: 1px;
            background-color: #eee;
            height: auto;
        }
        .pic-group {
            display: flex;
            > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-right: 20px;
            }
            > div:last-child {
                margin-right: 0px;
            }
            img {
                height: 85px;
                width: 120px;
                border-radius: 0%;
            }
        }
        .title {
            margin-left: 20px;
            font-size: 17px;
            font-weight: bold;
            color: #333;
        }
        .content-text {
            margin-left: 40px;
        }
        .content-img {
            margin-left: 20px;
            > img {
                height: 85px;
                width: 120px;
                border-radius: 0%;
                margin-right: 20px;
                margin-bottom: 20px;
            }
            > img:nth-child(3n) {
                margin-right: 0px;
            }
        }
    }
}
</style>
