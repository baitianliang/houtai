<template>
    <!-- 会员账单页面 -->
    <div id="MemberBill">
        <div class="toolbar">
            <div class="search-form">
                <el-input
                    size="small"
                    placeholder="请输入店铺名称"
                    suffix-icon="el-icon-search"
                    v-model="search.searchForm.name">
                </el-input>
                <el-date-picker
                    size="small"
                    v-model="search.searchForm.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button
                    size="small"
                    type="primary"
                    @click="getTableData">查询</el-button>
            </div>
            <el-button
                size="small"
                type="primary"
                round>导 出</el-button>
        </div>
        <div class="table-content">
            <div class="table-top">
                <div>
                    <img src="../assets/icon/openNum.png">
                    <div>
                        开通总数:<span style="color: #FC8184">{{ total }}</span>
                    </div>
                </div>
                <div>
                    <img src="../assets/icon/openMoney.png">
                    <div>
                        开通总金额:<span style="color: #FC8184">1500</span>
                    </div>
                </div>
            </div>
            <el-table
                :data="[...tableData, ...tableData, ...tableData, ...tableData]"
                height="45vh"
                border>
                <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
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
import { ref,reactive, onMounted } from 'vue'
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    setup() {
        onMounted(() => {})
        let page = ref(1), size = 20 ,total = ref(0)
        const search = reactive({
            searchForm: {
                name: '',
                date: ''
            }
        })
        function handleCurrentChange(val) {
            console.log(val)
        }
        function getTableData() {}
        return {
            page,
            size,
            total,
            search,
            handleCurrentChange,
            getTableData
        }
    }
}
</script>

<style lang="scss">
#MemberBill {
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
