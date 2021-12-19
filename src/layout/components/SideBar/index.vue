<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu
        v-for="(menu, index) in menus"
        :key="index"
        :index="(index+1).toString()"
        @click.native.stop="toTarget(menu)">
        <template slot="title" v-if="menu.label">
          <i :class="menu.icon"></i>
          <span>{{ menu.label }}</span>
        </template>
        <el-menu-item-group v-if="menu.children">
            <el-menu-item
              :index="(childIndex+1).toString()"
              v-for="(child, childIndex) in menu.children"
              @click.native.stop="toTarget(child)"
              :key="childIndex">
              <i :class="child.icon"></i>
              {{ child.label }}
            </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<style lang="scss" scoped>
.el-submenu .el-menu-item {
  min-width: 100%;
}
.el-menu-item-group__title {
  padding: 0;
}
/deep/ .el-menu-item-group__title {
  padding: unset;
}
</style>

<script>
export default {
  data () {
    return {
      menus: [{
        label: '客户管理',
        icon: 'el-icon-setting',
        path: '',
        children: [{
          label: '客户信息',
          icon: 'el-icon-user',
          path: '/home/customers-manage/customers-info'
        }, {
          label: '统计年鉴',
          icon: 'el-icon-user',
          path: '/home/customers-manage/statistics-years'
        }]
      }]
    }
  },
  methods: {
    toTarget (item) {
      console.log('item: ', item)
      // if (!item.path) {
      //   return this.$router.replace({
      //     path: item.children[0].path
      //   }).catch(() => {})
      // }

      // this.$router.push({
      //   path: item.path
      // }).catch(() => {})
    }
  }
}
</script>
