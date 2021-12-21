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

  let hasToken

  // 监控vuex，以取到异步数据
  store.watch((state) => {
    console.log('state: ', state)
    hasToken = state.user.token
  })

  console.log('token: ', hasToken)

  // const hasToken = store.getters['user/token']

  console.log('hasToken', hasToken, store.getters, store.getters['user/token'])

  if (hasToken) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })

      NProgress.done()
    } else {
      const identity = store.getters['user/userInfo'] && store.getters['user/userInfo'].identity

      // 普通用户路由配置
      if (identity === 1) {
        return next()
      }

      // 管理员路由配置
      if (identity === 2) {
        return next()
      }

      // 超级管理员路由配置
      if (identity === 3) {
        return next()
      }

      next('/login')

      NProgress.done()
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
