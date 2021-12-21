<template>
  <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="defaultOpen"
    >
      <template v-for="(menu, index) in menus" >
        <el-submenu v-if="menu.children" :key="index" :index="menu.path">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ menu.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(subMenu, subIndex) in menu.children"
              :key="subIndex"
              :index="subMenu.path"
              @click.native.stop="toTarget(subMenu)">{{ subMenu.label }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          v-else
          :key="index"
          :index="menu.path"
          @click.native.stop="toTarget(menu)">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ menu.label }}</span>
        </el-menu-item>
      </template>
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
  width: 15vw;
  min-height: 400px;
}

.el-menu-vertical-demo /deep/ .el-submenu .el-submenu__title {
  height: 2rem;
}
/deep/ .el-menu-item,
.el-submenu__title {
  height: 2rem;
  line-height: 2rem;
}
.el-menu-item-group__title {
  padding: 0;
}
/deep/ .el-menu-item-group__title {
  padding: unset;
}
.el-menu-item {
  min-width: unset;
}
</style>
