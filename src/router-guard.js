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
  let roles = []

  // 监控vuex，以取到异步数据
  store.watch((state) => {
    hasToken = state.user.token
    roles = state.user.roles
  })

  debugger

  if (hasToken) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })

      NProgress.done()
    } else {
      const hasRoutes = store.getters['permission/permission_routes'] && store.getters['permission/permission_routes'].length

      // 这里通过判断vuex中是否已存在可访问的权限路由
      // 来决定是否进入下一个路由
      // 不判断，next({ ...to, replace: true })会进入死循环
      if (hasRoutes) {
        next()
      } else {
        try {
          // 获取有访问权限的路由
          const accessRoutes = await store.dispatch('permission/setRoutes', roles)

          console.log('accessRoutes: ', accessRoutes)

          // 动态将权限路由添加到路由表中
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          next('/login')

          NProgress.done()
        }
      }
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
