<template>
    <!-- 产品管理页面 -->
    <div id="product-control">
        <div class="product-category">
            <el-menu
                v-if="categoryList.categoryList1.length"
                :uniqueOpened="true"
                default-active="2">
                <el-menu-item
                    v-for="(item, index) in categoryList.categoryList1"
                    :key="index"
                    :index="item.categoryId"
                    @click="getProductCategoryList('categoryList2', item.categoryId);
                            categoryParentId2 = item.categoryId;
                            show2 = true;
                            show3 = false;
                            show4 = false;">
                    <template #title>
                        <div style="border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                            <div>{{ item.categoryName }}</div>
                            <i v-if="showEdit1" class="el-icon-arrow-right"></i>
                            <div v-else>
                                <el-button @click.stop="editCategory('修改项目', '项目名称', 0, 'categoryList1', item.categoryId, item.categoryName)" type="text">
                                    <i class="el-icon-edit"></i>
                                </el-button>
                                <el-button @click.stop="deleteCategory(item.categoryId, 'categoryList1', 0)" type="text">
                                    <i class="el-icon-delete"></i>
                                </el-button>
                            </div>
                        </div>
                    </template>
                </el-menu-item>
            </el-menu>
            <div v-else class="no-list">
                <div>
                    —暂无项目，请添加—
                </div>
            </div>
            <div>
                <el-button size="small" type="primary" @click="addCategory('添加项目', '项目名称', 0, 'categoryList1')">添加项目</el-button>
                <el-button v-if="showEdit1" size="small" type="primary" @click="showEdit1 = false">编辑项目</el-button>
                <el-button v-else size="small" type="primary" @click="showEdit1 = true">取消编辑</el-button>
            </div>
        </div>
        <transition name="fade">
            <div class="product-category" v-if="show2">
                <el-menu
                    v-if="categoryList.categoryList2.length"
                    :uniqueOpened="true"
                    default-active="2">
                    <el-menu-item
                        v-for="(item, index) in categoryList.categoryList2"
                        :key="index"
                        :index="item.categoryId"
                        @click="getProductCategoryList('categoryList3', item.categoryId);
                                categoryParentId3 = item.categoryId;
                                show3 = true;
                                show4 = false">
                        <template #title>
                            <div style="border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                                <div>{{ item.categoryName }}</div>
                                <i v-if="showEdit2" class="el-icon-arrow-right"></i>
                                <div v-else>
                                    <el-button @click.stop="editCategory('修改品牌', '品牌名称', item.categoryParentId, 'categoryList2', item.categoryId, item.categoryName)" type="text">
                                        <i class="el-icon-edit"></i>
                                    </el-button>
                                    <el-button @click.stop="deleteCategory(item.categoryId, 'categoryList2', item.categoryParentId)" type="text">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </div>
                            </div>
                        </template>
                    </el-menu-item>
                </el-menu>
                <div v-else class="no-list">
                    <div>
                        —暂无品牌，请添加—
                    </div>
                </div>
                <div>
                    <el-button size="small" type="primary" @click="addCategory('添加品牌', '品牌名称', categoryParentId2, 'categoryList2')">添加品牌</el-button>
                    <el-button v-if="showEdit2" size="small" type="primary" @click="showEdit2 = false">编辑品牌</el-button>
                    <el-button v-else size="small" type="primary" @click="showEdit2 = true">取消编辑</el-button>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="product-category" v-if="show3">
                <el-menu
                    v-if="categoryList.categoryList3.length"
                    :uniqueOpened="true"
                    default-active="2">
                    <el-menu-item
                        v-for="(item, index) in categoryList.categoryList3"
                        :key="index"
                        :index="item.categoryId"
                        @click="getProductCategoryList('categoryList4', item.categoryId)
                                categoryParentId4 = item.categoryId;
                                show4 = true;">
                        <template #title>
                            <div style="border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                                <div>{{ item.categoryName }}</div>
                                <i v-if="showEdit3" class="el-icon-arrow-right"></i>
                                <div v-else>
                                    <el-button @click.stop="editCategory('修改型号', '型号名称', item.categoryParentId, 'categoryList3', item.categoryId, item.categoryName)" type="text">
                                        <i class="el-icon-edit"></i>
                                    </el-button>
                                    <el-button @click.stop="deleteCategory(item.categoryId, 'categoryList3', item.categoryParentId)" type="text">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </div>
                            </div>
                        </template>
                    </el-menu-item>
                </el-menu>
                <div v-else class="no-list">
                    <div>
                        —暂无型号，请添加—
                    </div>
                </div>
                <div>
                    <el-button size="small" type="primary" @click="addCategory('添加型号', '型号名称', categoryParentId3, 'categoryList3')">添加型号</el-button>
                    <el-button v-if="showEdit3" size="small" type="primary" @click="showEdit3 = false">编辑型号</el-button>
                    <el-button v-else size="small" type="primary" @click="showEdit3 = true">取消编辑</el-button>
                </div>
            </div>
        </transition>
        <transition name="fade">
            <div class="product-category" v-if="show4">
                <el-menu
                    v-if="categoryList.categoryList4.length"
                    :uniqueOpened="true"
                    default-active="2">
                    <el-menu-item
                        v-for="(item, index) in categoryList.categoryList4"
                        :key="index"
                        :index="item.categoryId">
                        <template #title>
                            <div style="border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;">
                                <div>{{ item.categoryName }}</div>
                                <i v-if="showEdit4" class="el-icon-arrow-right"></i>
                                <div v-else>
                                    <el-button @click.stop="editCategory('修改颜色', '颜色名称', item.categoryParentId, 'categoryList4', item.categoryId, item.categoryName)" type="text">
                                        <i class="el-icon-edit"></i>
                                    </el-button>
                                    <el-button @click.stop="deleteCategory(item.categoryId, 'categoryList4', item.categoryParentId)" type="text">
                                        <i class="el-icon-delete"></i>
                                    </el-button>
                                </div>
                            </div>
                        </template>
                    </el-menu-item>
                </el-menu>
                <div v-else class="no-list">
                    <div>
                        —暂无颜色，请添加—
                    </div>
                </div>
                <div>
                    <el-button size="small" type="primary" @click="addCategory('添加颜色', '颜色名称', categoryParentId4, 'categoryList4')">添加颜色</el-button>
                    <el-button v-if="showEdit4" size="small" type="primary" @click="showEdit4 = false">编辑颜色</el-button>
                    <el-button v-else size="small" type="primary" @click="showEdit4 = true">取消编辑</el-button>
                </div>
            </div>
        </transition>
        <el-dialog :title="dialogTitle" v-model="dialogFormVisible" v-if="dialogFormVisible" width="600px">
            <el-form :model="addForm.form" label-width="80px">
                <el-form-item :label="dialogLabel">
                    <el-input
                        v-model="item.categoryName"
                        placeholder="请输入名称"
                        autocomplete="off"
                        v-for="(item, index) in addForm.nameList"
                        :key="index"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="categoryAdd">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from '../assets/axios/ProductControl'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
export default {
    setup() {
        let dialogFormVisible = ref(false),
        dialogTitle = ref(''),
        dialogLabel = ref(''),
        categoryParentId2 = ref(0),
        categoryParentId3 = ref(0),
        categoryParentId4 = ref(0),
        categoryParentId = ref(0),
        show2 = ref(false),
        show3 = ref(false),
        show4 = ref(false),
        showEdit1 = ref(true),
        showEdit2 = ref(true),
        showEdit3 = ref(true),
        showEdit4 = ref(true),
        categoryListName = ref(''),
        categoryList = reactive({
            categoryList1: [],
            categoryList2: [],
            categoryList3: [],
            categoryList4: [],
        }),
        addForm = reactive({
            nameList: [{
                categoryName: ''
            }]
        })
        onMounted(() => {
            getProductCategoryList('categoryList1', 0)
        })
        function getProductCategoryList(val, id) {
            axios.getProductCategoryList(id)
            .then(({data}) => {
                if(data.status === 0) {
                    categoryList[val] = data.result
                }
            })
        }
        function addCategory(str1, str2, val, name) {
            dialogTitle.value = str1
            dialogLabel.value = str2
            categoryParentId.value = val
            categoryListName.value = name
            dialogFormVisible.value = true
        }
        function closeDialog() {
            addForm.nameList = [{
                categoryName: ''
            }]
            dialogTitle.value = ''
            dialogLabel.value = ''
            categoryParentId.value = 0
            categoryListName.value = ''
            dialogFormVisible.value = false
        }
        function categoryAdd() {
            if(!addForm.nameList[0].categoryId) {
                addForm.nameList.forEach(el => el.categoryParentId = categoryParentId.value)
                axios.addCategory(addForm.nameList)
                .then(res => {
                    if(res.data.status === 0) {
                        open('success', '添加成功')
                        getProductCategoryList(categoryListName.value, addForm.nameList[0].categoryParentId)
                        closeDialog()
                    }
                })
                .catch(err => {
                    open('error', '命名重复')
                })
            } else {
                axios.updateCategory(addForm.nameList[0])
                .then(res => {
                    if(res.data.status === 0) {
                        open('success', '修改成功')
                        getProductCategoryList(categoryListName.value, categoryParentId.value)
                        closeDialog()
                    }
                })
                .catch(err => {
                    open('error', '命名重复')
                })
            }
        }
        function editCategory(str1, str2, val, name, id, categoryName) {
            dialogTitle.value = str1
            dialogLabel.value = str2
            categoryParentId.value = val
            categoryListName.value = name
            addForm.nameList = [{categoryId: id, categoryName}]
            dialogFormVisible.value = true
        }
        function deleteCategory(id, str, val) {
            axios.deleteCategory(id)
            .then(res => {
                if(res.data.status === 0) {
                    open('success', '删除成功')
                    getProductCategoryList(str, val)
                    closeDialog()
                }
            })
        }
        return {
            dialogFormVisible,
            dialogTitle,
            dialogLabel,
            categoryList,
            categoryParentId2,
            categoryParentId3,
            categoryParentId4,
            show2,
            show3,
            show4,
            showEdit1,
            showEdit2,
            showEdit3,
            showEdit4,
            getProductCategoryList,
            addForm,
            addCategory,
            closeDialog,
            categoryAdd,
            editCategory,
            deleteCategory
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
#product-control {
    margin: 20px;
    min-height: 80vh;
    height: auto;
    display: flex;
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }
    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }
    .product-category {
        width: 23%;
        margin-right: 2%;
        background-color: #fff;
        height: 80vh;
        overflow: auto;
        .el-menu {
            border-right: 0px;
            height: 92%;
            .el-menu-item {
                text-align: left;
                padding-left: 0px;
            }
        }
        .no-list {
            height: 92%;
            > div {
                padding-top: 10px;
                color: #808080;
            }
        }
    }
}
</style>
