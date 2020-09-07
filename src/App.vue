<template>
  <div id="app">
    <Toolbar @click="handleMode"/>
    <router-view></router-view>
    <Sponsor v-if="!production"/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import Sponsor from './components/Sponsor'
import { environment } from "./environments/environment";

export default {
  components: {
    Toolbar,
    Sponsor
  },
  data() {
    return {
      production: environment.production,
      darkMode: false
    }
  },
  methods: {
    handleMode(mode){
      this.darkMode = mode
    }
  },
}
</script>
<style lang="scss" src="./assets/scss/global.scss" />