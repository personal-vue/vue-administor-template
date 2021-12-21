<template>
  <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      :default-active="defaultOpen"
      active-text-color="#ffd04b">
      <div v-for="(menu, index) in menus" :key="index">
        <!-- 没有子菜单 -->
        <el-menu-item
          v-if="!menu.children"
          :index="menu.path"
          @click.native.stop="toTarget(menu)">
          <i :class="menu.icon"></i>
          {{ menu.label }}
        </el-menu-item>
        <!-- 存在子菜单 -->
        <el-submenu
          v-else
          :index="menu.path">
          <template slot="title" v-if="menu.label">
            <i :class="menu.icon"></i>
            <span>{{ menu.label }}</span>
          </template>
          <el-menu-item-group v-if="menu.children">
              <el-menu-item
                :index="child.path"
                v-for="(child, childIndex) in menu.children"
                @click.native.stop="toTarget(child)"
                :key="childIndex">
                <i :class="child.icon"></i>
                {{ child.label }}
              </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menus: [{
        label: '主页',
        icon: 'el-icon-setting',
        path: '/dashboard'
      }, {
        label: '客户管理',
        icon: 'el-icon-setting',
        path: '/customer-manage',
        children: [{
          label: '客户信息',
          icon: 'el-icon-user',
          path: '/customer-manage/customers'
        }, {
          label: '订单信息',
          icon: 'el-icon-user',
          path: '/customer-manage/orders'
        }]
      }]
    }
  },
  computed: {
    ...mapGetters('app', [
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    defaultOpen () {
      console.log('this.sidebar.defaultOpen: ', this.sidebar.defaultOpen)
      return this.sidebar.defaultOpen
    }
  },
  methods: {
    toTarget (item) {
      console.log('item: ', item)

      this.$store.dispatch('app/updateDefaultOpen', item.path)

      this.$router.push({
        path: item.path
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo /deep/ .el-submenu .el-submenu__title {
  height: 2rem;
}
/deep/ .el-menu-item, .el-submenu__title {
  height: 2rem;
  line-height: 2rem;
}
.el-menu-item-group__title {
  padding: 0;
}
/deep/ .el-menu-item-group__title {
  padding: unset;
}
</style>
