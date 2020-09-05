<template>
  <div id="app">
    <header id="main-header" :class="{'only-logo': !toolbar}">
      <nav>
        <div class="container">
          <div class="flex align-center">
            <div class="column">
              <h1 class="logo fade-in">
                <router-link to="/">Technical Laboratory</router-link>
              </h1>

              <ul class="user-actions fade-in" v-if="logged">
                <li>
                  <a href="#" @click="logout()">
                    <i class="las la-user-circle"></i> Welcome User
                  </a>
                </li>
              </ul>
            </div>
            <div class="column" v-if="toolbar">
              <img class="pokemon-logo-home fade-in" src="@/assets/images/pokemon-logo.png" />
            </div>
            <div class="column" v-if="toolbar">
              <ul class="user-actions fade-in" v-if="logged">
                <li>
                  <router-link to="/home">Home</router-link>
                </li>
                <li>
                  <router-link to="/home">Skills</router-link>
                </li>
                <li>
                  <a href="#" @click="logout()">Log out</a>
                </li>
                <li>
                  <button href="#" @click="toogle()">Dark mode</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toolbar: true,
      logged: true,
    };
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
    checkRoute(to) {
      const routes = ["/"];
      if (routes.includes(to.path)) this.toolbar = false;
      else this.toolbar = true;

      if (this.$store.getters.user) this.logged = true;
      else this.logged = false;
    },
    logout() {
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    toogle() {
      console.log("Mode");
    },
  },
};
</script>

<style lang="scss" src="./assets/scss/global.scss" />