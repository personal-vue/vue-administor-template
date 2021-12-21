<template>
    <div class="flex-row main-between box">
        <Sidebar class="side"></Sidebar>
        <div class="content">
          <Navbar></Navbar>
          <AppMain></AppMain>
        </div>
    </div>
</template>

<script>
import { AppMain, Navbar, Sidebar } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
  overflow: hidden;
}
.side {
  width: 15vw;
  height: 100%;
}
.content {
  width: 85vw;
  height: 100%;
}
</style>
