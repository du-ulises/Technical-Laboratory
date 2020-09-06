<template>
  <header id="main-header" :class="{'only-logo': !toolbar}">
    <nav>
      <div class="container">
        <div class="flex align-center">
          <div class="column">
            <h1 class="logo fade-in">
              <router-link to="/">Technical Laboratory</router-link>
            </h1>

            <ul class="user-actions fade-in hidden-md" v-if="logged && toolbar">
              <li>
                <a href="#" @click="logout()" class="welcome">
                  <i class="las la-user-circle"></i>
                  {{isNewUser ? "Welcome" : "Hello"}} {{name}}
                </a>
              </li>
            </ul>
          </div>
          <div class="column" v-if="toolbar">
            <img class="pokemon-logo-home fade-in" src="@/assets/images/pokemon-logo.png" />
          </div>
          <div class="column hidden-md" v-if="toolbar">
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
                <button @click="toogle()">Dark mode</button>
              </li>
            </ul>
          </div>
          <div class="column responsive-md" v-if="logged && toolbar">
            <a href="#" @click="console.log('Cooming Soon')" style="margin-left: 1.5rem">Menu</a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      toolbar: true,
      logged: true,
      name: "",
      isNewUser: false
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
      const routes = ["/", "/404"];
      if (routes.includes(to.path)) this.toolbar = false;
      else this.toolbar = true;

      if (this.$store.getters.user) {
        this.logged = true;
        this.name = this.$store.getters.user.email;
        this.isNewUser = this.$store.getters.additionalUserInfo.isNewUser;
      } else this.logged = false;
    },
    logout() {
      this.$store.commit("setUser", null);
      this.$store.commit("setSelectedList", []);
      this.$router.push("/");
    },
    toogle() {
      console.log("Mode");
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome {
  @media screen and (max-width: $break-large) {
    max-width: 150px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
}
</style>