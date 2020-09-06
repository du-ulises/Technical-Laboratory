<template>
  <div id="app">
    <Toolbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
export default {
  components: {
    Toolbar
  }
}
</script>
<style lang="scss" src="./assets/scss/global.scss" />