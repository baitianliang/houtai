<template>
  <div id="b-head">
    <el-row class="tac">
      <el-col :xs="5" :sm="5" :md="4" :lg="3" :xl="3">
        <div>拍绑绑管理端</div>
      </el-col>
      <el-col :xs="19" :sm="19" :md="20" :lg="21" :xl="21">
        <slot></slot>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
#b-head {
  min-height: 8vh;
  height: 60px;
  background: #fff;
  .el-row {
    height: 100%;
    .el-col {
      display: flex;
      align-items: center;
    }
    .el-col:first-child {
      justify-content: center;
      font-size: 1.3rem;
      font-weight: bold;
    }
    .el-col:last-child {
      justify-content: flex-end;
      height: 100%;
      > div {
        height: 100%;
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #406DE2;
        font-size: 1.2rem;
        color: #fff;
      }
    }
  }
}
</style>