import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
import Layout from '@/layout/index'

const personal = resolve => require(['@/views/personal-manage/index'], resolve)

// 使用了vue-routerd的[Lazy Loading Routes](https://router.vuejs.org/en/advanced/lazy-loading.html)
const dashboard = resolve => require(['@/views/dashboard/index'], resolve)
const customers = resolve => require(['@/views/customer-manage/customers/index'], resolve)
const orders = resolve => require(['@/views/customer-manage/orders/index'], resolve)
const roles = resolve => require(['@/views/system-manage/roles-manage/index'], resolve)
const users = resolve => require(['@/views/system-manage/users-manage/index'], resolve)
const logs = resolve => require(['@/views/system-manage/logs-manage/index'], resolve)
const departments = resolve => require(['@/views/system-manage/departments-manage/index'], resolve)
const menus = resolve => require(['@/views/system-manage/menus-manage/index'], resolve)
const positions = resolve => require(['@/views/system-manage/positions-manage/index'], resolve)

Vue.use(Router)

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/personal-manage',
    component: personal
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'main',
    children: [{
      path: 'dashboard',
      component: dashboard,
      name: 'dashboard',
      meta: {
        title: '主页',
        icon: 'icon-huaban',
        roles: [1, 2, 3] // you can set roles in root nav
      }
    }]
  },
  {
    path: '/customer-manage',
    component: Layout,
    redirect: '/customer-manage/customers',
    name: 'customer-manage',
    meta: {
      title: '客户管理',
      icon: 'icon-kehuguanli',
      roles: [1, 2, 3] // you can set roles in root nav
    },
    children: [{
      path: 'customers',
      component: customers,
      name: 'customers',
      meta: {
        title: '客户',
        icon: 'icon-kehu',
        affix: true
      }
    }, {
      path: 'orders',
      component: orders,
      name: 'orders',
      meta: {
        title: '订单',
        icon: 'icon-dingdan',
        affix: true
      }
    }]
  },
  {
    path: '/system-manage',
    component: Layout,
    redirect: '/system-manage/users-manage',
    name: 'system-manage',
    meta: {
      title: '系统管理',
      icon: 'icon-xitongguanli-caidanguanli',
      roles: [1, 2, 3] // you can set roles in root nav, 1：普通用户，2：管理员，3：超级管理员，4：开发者
    },
    children: [{
      path: 'users-manage',
      component: users,
      name: 'users',
      meta: {
        title: '用户',
        icon: 'icon-yonghuguanli',
        roles: [2, 3],
        affix: true
      }
    }, {
      path: 'roles-manage',
      component: roles,
      name: 'roles',
      meta: {
        title: '角色',
        icon: 'icon-guanliyuan_jiaoseguanli',
        roles: [2, 3],
        affix: true
      }
    }, {
      path: 'positions-manage',
      component: positions,
      name: 'positions',
      meta: {
        title: '岗位',
        icon: 'icon-gangweiguanli',
        roles: [2, 3],
        affix: true
      }
    }, {
      path: 'departments-manage',
      component: departments,
      name: 'departments',
      meta: {
        title: '部门',
        icon: 'icon-bumenguanli',
        roles: [2, 3],
        affix: true
      }
    }, {
      path: 'menus-manage',
      component: menus,
      meta: {
        title: '菜单',
        icon: 'icon-xitongguanli-caidanguanli',
        roles: [2, 3],
        affix: true
      }
    }, {
      path: 'logs-manage',
      component: logs,
      name: 'logs',
      meta: {
        title: '日志',
        icon: 'icon-rizhiguanli',
        roles: [1, 2, 3],
        affix: true
      }
    }]
  },
  {
    /**
     * 通配符路由必须放在所有路由的最后面
     * 不能放在constantRoutes最后
     * 否则通过addRoutes动态添加asyncRoutes
     * 会将asyncRoutes添加到通配符路由后
     * 路由匹配是从上到下按顺序匹配的
     * 这样会出现登陆后即进入404页面
     */
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
