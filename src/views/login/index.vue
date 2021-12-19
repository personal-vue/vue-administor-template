<template>
    <el-form class="form flex-column secondary-center" label-position="left" label-width="80px" :model="formLabelAlign">
        <el-form-item class="form-item flex-row secondary-center" label="用户名">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item class="form-item flex-row secondary-center" label="密码">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>

        <el-button type="primary" class="submit-btn" @click="login">登录</el-button>
    </el-form>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    login () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  width: 50vw;
  height: calc( 50vw * 0.5 );

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.form-item {
  width: 50%;
}
.form-item /deep/ .el-form-item__content {
  margin-left: 0 !important;
  width: 100%;
}
.submit-btn {
  width: 50%;
}
</style>
