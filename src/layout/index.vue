<template>
    <div class="flex-row box">
        <sidebar class="side" />
        <div class="content">
          <section>
            <navbar />
            <tags-view />
          </section>
          <app-main />
        </div>
    </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar,
    TagsView
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
