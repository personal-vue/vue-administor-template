<template>
  <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="isCollapse"
      :collapse-transition="false"
      :default-active="defaultOpen"
    >
      <el-menu-item
        class="system-icon flex-row main-center secondary-center">
        <i class="iconfont icon-xitong"></i>
        <span slot="title">{{ systemName }}</span>
      </el-menu-item>
      <template v-for="(menu, index) in menus" >
        <el-submenu
          v-if="menu.children.length !== 1"
          :key="index"
          :index="menu.name">
          <template slot="title">
            <i :class="['iconfont ', menu.meta.icon]"></i>
            <span slot="title">{{ menu.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(subMenu, subIndex) in menu.children"
              :key="subIndex"
              :index="subMenu.name"
              @click.native.stop="toTarget(subMenu)">
                <i :class="['iconfont ', subMenu.meta.icon]"></i>
                <span slot="title">{{ subMenu.meta.title }}</span>
              </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item
          v-else
          :key="index"
          :index="menu.children[0].name"
          @click.native.stop="toTarget(menu.children[0])">
          <i :class="['iconfont ', menu.children[0].meta.icon]"></i>
          <span slot="title">{{ menu.children[0].meta.title }}</span>
        </el-menu-item>
      </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      systemName: '模板系统'
    }
  },
  computed: {
    ...mapGetters('app', ['sidebar']),
    ...mapGetters('permission', ['permission_routes']),
    isCollapse () {
      return !this.sidebar.opened
    },
    defaultOpen () {
      console.log('defaultOpen: ', this.sidebar.defaultOpen)
      return this.sidebar.defaultOpen
    },
    menus () {
      console.log('permission_routes: ', this.permission_routes)
      return this.permission_routes.filter((item) => item.path !== '*')
    }
  },
  methods: {
    toTarget (item) {
      console.log('item: ', item)

      this.$store.dispatch('app/updateDefaultOpen', item.name)

      this.$router.push({
        name: item.name
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.system-icon {
  font-size: 32px;
  font-weight: 600;
  font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
  i {
    font-size: inherit;
    padding: 0 10px;
    color: rgba(0, 225, 255, 0.8);
  }
}
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
