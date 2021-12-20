import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 不需要重定向的白名单
const whiteList = ['/login']

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  store.watch((state, getters) => getters['user/token'], (token) => {
    console.log('token', token)
  })

  const hasToken = store.getters['user/token']

  console.log('hasToken', hasToken, store.getters, store.getters['user/token'])

  if (hasToken) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })

      NProgress.done()
    } else {
      const hasRoles = store.getters['user/roles'] && store.getters['user/roles'].length > 0

      console.log('hasRoles: ', hasRoles, store.getters, store.getters['user/roles'])

      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          // const { roles } = await store.dispatch('user/getInfo')

          // // generate accessible routes map based on roles
          // const accessRoutes = await store.dispatch('permission/setRoutes', roles)

          // // dynamically add accessible routes
          // router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          // next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          // await store.dispatch('user/clearUserInfoAndTokens')
          // Message.error(error || 'Has Error')
          // next(`/login?redirect=${to.path}`)
          next('/login')

          NProgress.done()
        }
      }

      // if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      //   // store.dispatch('GetInfo').then(res => { // 拉取info
      //   //   const roles = res.data.role
      //   //   store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
      //   //     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //   //     next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //   //   })
      //   // }).catch(err => {
      //   //   console.log(err)
      //   // })
      // } else {
      //   next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      // }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      // next(`/login?redirect=${to.path}`)

      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
