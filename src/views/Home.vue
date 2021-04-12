<template>
  <div id="home">
    <b-head>
      <template v-slot>
        <!-- <div>admin</div> -->
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            admin<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="clearfix" @click="showDialogFormVisible">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item class="clearfix" @click="logOut">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </b-head>
    <div class="content">
      <el-row class="tac">
        <el-col :xs="5" :sm="5" :md="4" :lg="3" :xl="3">
          <b-hav></b-hav>
        </el-col>
        <el-col :xs="19" :sm="19" :md="20" :lg="21" :xl="21">
          <div class="page-title">
              <span>{{ routeName }}</span>
          </div>
          <router-view/>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="修改密码" v-model="dialogFormVisible" v-if="dialogFormVisible" width="500px">
        <el-form :model="updataUserPwd.form" label-width="80px">
            <el-form-item label="旧密码">
                <el-input v-model="updataUserPwd.form.oldPwd" placeholder="请输入旧密码" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="updataUserPwd.form.newPwd" placeholder="请输入新密码" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="updataPwd">确 定</el-button>
            </span>
        </template>
    </el-dialog>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, getCurrentInstance, onMounted, onUpdated, reactive } from 'vue'
import BHead from '../components/base/BHead'
import BHav from '../components/base/BHav'
export default {
  components: {
    BHead,
    BHav
  },
  setup() {
    const router = useRouter()
    // 获取路由信息
    const { ctx } = getCurrentInstance()
    let routeName = ref(''), dialogFormVisible = ref(false)
    let updataUserPwd = reactive({
      form: {
        oldPwd: '',
        newPwd: ''
      }
    })
    function showDialogFormVisible() {
      dialogFormVisible.value = true
    }
    function closeDialog() {
      dialogFormVisible.value = false
      updataUserPwd.form.oldPwd = ''
      updataUserPwd.form.newPwd = ''
    }
    function updataPwd() {
      closeDialog()
    }
    function logOut() {
      localStorage.clear()
      router.push('/Login')
    }
    onMounted(() => {
      routeName.value = router.currentRoute._rawValue.name
    })
    onUpdated(() => {
      routeName.value = router.currentRoute._rawValue.name
    })
    return {
      routeName,
      dialogFormVisible,
      showDialogFormVisible,
      updataUserPwd,
      closeDialog,
      updataPwd,
      logOut
    }
  }
}
</script>

<style lang="scss">
#home {
  height: 100%;
  .content {
    .el-row {
      height: auto;
    }
  }
  .el-dropdown-link {
    font-size: 1.2rem;
    color: #fff;
    cursor: pointer;
  }
}
.page-title {
  display: flex;
  // justify-content: flex-start;
  align-items: center;
  height: 6vh;
  background-color: #fff;
  border-top: 2px solid #eee;
  > span {
    margin-left: 20px;
    line-height: 20px;
    border-left: 3px solid #596ADC;
    padding-left: 5px;
    font-weight: bold;
  }
}
.toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px 20px;
    padding: 30px 10px;
    border-bottom: 1px solid #eee;
    .search-form {
        display: flex;
        align-items: center;
        .el-input {
            width: 200px;
            margin-right: 20px;
        }
        .el-date-editor {
            width: 300px;
            margin-right: 20px;
        }
    }
}
</style>
