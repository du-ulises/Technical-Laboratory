<template>
  <div style="background-color: #030303;" class="native-fixed fade-in" v-if="displaySponsor">
    <a style="color: #ffffff;" class="native-link fade-in" href="#">
      <div class="native-sponsor" style="background-color: #ffffff; color: #030303;">Developing</div>
      <div class="native-text">By Diego Ulises Martínez — This application is not in production.</div>
    </a>
    <a class="native-link fade-in" href="#">
      <div
        class="native-sponsor testErrorInterceptor"
        @click="testRequest()"
        style="color: #030303;"
      >Test error interceptor</div>
    </a>
  </div>
</template>

<script>
import * as api from "../services/pokemonService";
export default {
  data() {
    return {
      displaySponsor: false
    }
  },
  created() {
    this.checkRoute(this.$route);
  },
  watch: {
    $route(to) {
      this.checkRoute(to);
    },
  },
  methods: {
    async testRequest() {
      await api.badRequest();
    },
    checkRoute(to) {
      const routes = ["/", "/404"];
      if (routes.includes(to.path)) this.displaySponsor = false;
      else this.displaySponsor = true;
    },
  },
};
</script>