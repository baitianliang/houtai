<template>
    <!-- 用户列表页面 -->
    <div id="users-list">
        <div class="toolbar">
            <div class="search-form">
                <el-input
                    size="small"
                    placeholder="输入用户姓名搜索"
                    suffix-icon="el-icon-search"
                    v-model="userList.searchForm.name">
                </el-input>
                <!-- <el-select
                    size="small"
                    v-model="userList.searchForm.status"
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
                    @click="getUserList">查询</el-button>
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
                    <img src="../assets/icon/userNum.png">
                    <div>
                        用户总数:<span style="color: #FC8184">{{ total }}</span>
                    </div>
                </div>
            </div>
            <el-table
                :data="userList.tableData"
                height="45vh"
                border>
                <!-- <el-table-column
                    prop="userName"
                    label="用户姓名">
                </el-table-column> -->
                <el-table-column
                    prop="userNickName"
                    label="用户昵称">
                </el-table-column>
                <el-table-column
                    prop="userCreateTime"
                    label="创建时间">
                    <template #default="scope">
                        <p>{{ scope.row.userCreateTime ? scope.row.userCreateTime.substring(0, 10) : '' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userMobileId"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="roleName"
                    label="用户角色">
                </el-table-column>
                <el-table-column
                    prop="roleId"
                    label="用户角色编号">
                </el-table-column>
                <el-table-column
                    prop="userStatus"
                    label="用户状态">
                    <template #default="scope">
                        <p>{{ scope.row.userStatus === 'active' ? '可用' : '禁用' }}</p>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户头像">
                    <template #default="scope">
                        <el-button
                            v-if="scope.row.userAvatar"
                            type="text"
                            size='mini'
                            @click="showPic(scope.row.userAvatar)">
                            点击查看
                        </el-button>
                        <span v-else>暂无头像</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template #default="scope">
                        <el-button
                            type="text"
                            size='mini'
                            @click="updataUserPwd(scope.row)">
                            重置密码
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
import axios from '../assets/axios/UsersList'
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
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
        }
    },
    setup() {
        let { page, size, total, userList, handleCurrentChange, getUserList } = getTableData()
        onMounted(() => {
            getUserList()
        })
        function showPic(pic) {
            ElMessageBox({
                title: '用户头像',
                message: `<img src="${pic}" style="width: 100%">`,
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
            });
        }
        function updataUserPwd(val) {
            axios.updataUserPwd({userId: val.userId, newPwd: '123456'})
            .then(res => {
                if (res && res.data && res.data.status === 0) {
                    open('success', '此用户密码已重置为：123456')
                    getUserList()
                }
            })
        }
        return {
            page,
            size,
            total,
            userList,
            getUserList,
            handleCurrentChange,
            showPic,
            updataUserPwd,
        }
    }
}
// 查询
function getTableData() {
    let page = ref(1), size = 20 ,total = ref(0)
    const userList = reactive({
        searchForm: {
            name: '',
            status: ''
        },
        tableData: []
    })
    function getUserList() {
        axios.getUserList((page.value - 1) * size, size)
        .then(({data}) => {
            if(data.status === 0) {
                userList.tableData = data.result
                total.value = data.totalCount
                console.log(data.result)
            }
        })
    }
    function handleCurrentChange(val) {
        page.value = val
        getUserList()
    }
    return {
        page,
        size,
        total,
        userList,
        getUserList,
        handleCurrentChange,
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
#users-list {
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
