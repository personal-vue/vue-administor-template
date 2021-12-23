<template>
    <section>
      <el-form
        class="form flex-column secondary-center rotate-3D rotate-3D-front"
        :style="{transform:`rotateY(${styleFront.transform}deg) translateY(-50%)`,zIndex:`${styleFront.zIndex}`}"
        label-position="left"
        label-width="80px"
        :model="formLabelAlign">
          <el-form-item class="form-item flex-row secondary-center" label="用户名">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item class="form-item flex-row secondary-center" label="密码">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>

          <div class="footer flex-column">
            <el-button type="primary" class="submit-btn" @click="login">登录</el-button>
            <el-link :underline="false" class="link" type="info" @click="revert">忘记密码？</el-link>
          </div>
      </el-form>

      <el-form
        class="form form-back flex-column secondary-center rotate-3D rotate-3D-back"
        :style="{transform:`rotateY(${styleBack.transform}deg) translateY(-50%)`,zIndex:`${styleBack.zIndex}`}"
        label-position="left"
        label-width="80px"
        :model="formLabelAlign">
          <el-form-item class="form-item flex-row secondary-center" label="用户名">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item class="form-item flex-row secondary-center" label="密码">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item class="form-item flex-row secondary-center" label="确认密码">
            <el-input v-model="formLabelAlign.confirmPassword"></el-input>
          </el-form-item>

          <div class="footer flex-column">
            <el-button type="primary" class="submit-btn" @click="login">重置</el-button>
            <el-link :underline="false" class="link" type="info" @click="revert">去登录?</el-link>
          </div>
      </el-form>
    </section>
</template>

<script>
import { resetPassword, userLogin } from '@/api/v1/user'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      front: true,
      styleFront: {
        transform: 0,
        zIndex: 2
      },
      styleBack: {
        transform: 180,
        zIndex: 1
      },
      formLabelAlign: {
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    ...mapActions({
      updateUserInfo: 'user/updateUserInfo',
      updateToken: 'user/updateToken',
      updateRoles: 'user/updateRoles'
    }),
    login () {
      if (!this.formLabelAlign.username || !this.formLabelAlign.password) return this.toastInfo('请输入用户名和密码', 'error')

      this.userLogin().then(({ token, userInfo }) => {
        this.toastInfo('登录成功', 'success')
        console.log('data: ', userInfo)
        this.updateUserInfo(userInfo)
        this.updateToken(token)
        if (userInfo.identity) {
          let roles = []
          roles.push(userInfo.identity)

          // 存储用户角色
          this.updateRoles(roles)
        }

        this.$router.push({
          path: '/'
        })
      })
    },
    // 提示信息
    toastInfo (message, messageType) {
      return this.$message[messageType](message)
    },
    // 切换登录、重置密码
    revert () {
      this.front = !this.front

      // this.resetFormData()
      this.setStyle()
    },
    userLogin () {
      let params = {
        username: this.formLabelAlign.username,
        password: this.formLabelAlign.password
      }

      return new Promise((resolve, reject) => {
        userLogin(params).then((res) => {
          if (res.success) {
            let result = res.data

            resolve(result)
          }

          if (!res.success) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(false)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    resetPassword () {
      let params = {
        username: this.formLabelAlign.username,
        newPassword: this.formLabelAlign.password
      }

      return new Promise((resolve, reject) => {
        resetPassword(params).then((res) => {
          if (res.success) {
            resolve(true)
          }
          if (!res.success) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(false)
          }
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 设置翻转样式
    setStyle () {
      if (this.front) {
        this.styleFront.zIndex = 2
        this.styleFront.transform = 0
        this.styleBack.zIndex = 1
        this.styleBack.transform = 180
      }

      if (!this.front) {
        this.styleFront.zIndex = 1
        this.styleFront.transform = 180
        this.styleBack.zIndex = 2
        this.styleBack.transform = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rotate-3D {
  transition:all .5s ease-in-out;
  transform-style:preserve-3d;
  backface-visibility:hidden;
}
.rotate-3D-front {
  transform:rotateY(0deg);
  z-index:2;
}
.rotate-3D-back {
  transform:rotateY(180deg);
  z-index:1;
}
.form {
  width: 25vw;
  height: calc( 40vw * 0.35 );

  box-shadow: 0px 0px 10px #000;
  border-radius: 10px;

  box-sizing: border-box;
  padding: 30px 20px;

  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -60%);
}
.form-back {
  height: calc( 50vw * 0.35 );
}
.form-item {
  width: 100%;
}
.form-item /deep/ .el-form-item__content {
  margin-left: 0 !important;
  width: 100%;
}
.footer {
  width: 100%;
  position: relative;
}
.submit-btn {
  width: 100%;
}
.link {
  align-self: flex-end;
  box-sizing: border-box;
  padding: 10px 0;
}
</style>
