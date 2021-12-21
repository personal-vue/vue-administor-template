<template>
    <div class="flex-row box">
        <Sidebar class="side"></Sidebar>
        <div class="content">
          <section>
            <Navbar></Navbar>
          </section>
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
  height: 100%;
}
.content {
  min-width: 85vw;
  height: 100%;
  flex: 1;
}
</style>
