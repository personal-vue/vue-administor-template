import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import Layout from '@/layout/index'

// 使用了vue-routerd的[Lazy Loading Routes](https://router.vuejs.org/en/advanced/lazy-loading.html)
const dashboard = resolve => require(['@/views/dashboard/index'], resolve)

Vue.use(Router)

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      component: dashboard
    }]
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   name: '权限测试',
  //   meta: { role: ['admin', 'super_editor'] }, // 页面需要的权限
  //   children: [
  //     {
  //       path: 'index',
  //       component: Permission,
  //       name: '权限测试页',
  //       meta: { role: ['admin', 'super_editor'] } // 页面需要的权限
  //     }]
  // },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 实例化vue的时候只挂载constantRouter
const createRouter = () => new Router({
  // mode: 'history', // 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
