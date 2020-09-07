<template>
  <div id="app">
    <Toolbar @click="handleMode" />
    <router-view></router-view>
    <Sponsor v-if="!production" />
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar";
import Sponsor from "./components/Sponsor";
import { environment } from "./environments/environment";

export default {
  components: {
    Toolbar,
    Sponsor,
  },
  data() {
    return {
      production: environment.production,
      darkMode: false,
    };
  },
  methods: {
    handleMode(mode) {
      this.darkMode = mode;
    },
  },
  created() {
    this.$store.watch(
      () => {
        return this.$store.getters.errorInterceptor;
      },
      (newValue) => {
        if (newValue) {
          this.$vToastify.error({
            title: "¡Error!",
            body: "Opps algo salio mal.",
            type: "error",
            canPause: true,
            canTimeout: true,
            duration: 1500,
            theme: "light",
          });
          this.$store.commit("setErrorInterceptor", false);
        }
      }
    );
  },
};
</script>
<style lang="scss" src="./assets/scss/global.scss" />