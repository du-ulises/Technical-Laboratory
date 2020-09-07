<template>
  <header id="main-header" :class="{'only-logo': !toolbar, 'darkMode': darkMode && toolbar}">
    <nav>
      <div class="container">
        <div class="flex align-center">
          <div class="column">
            <h1 class="logo fade-in">
              <router-link
                to="/"
                :class="{'darkMode-link': darkMode && toolbar}"
              >Technical Laboratory</router-link>
            </h1>

            <ul class="user-actions fade-in hidden-md" v-if="logged && toolbar">
              <li>
                <a href="#" @click="logout()" class="welcome" :class="{'darkMode-link': darkMode}">
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
                <router-link to="/home" :class="{'darkMode-link': darkMode}">Home</router-link>
              </li>
              <li>
                <router-link to="/home" :class="{'darkMode-link': darkMode}">Skills</router-link>
              </li>
              <li>
                <a href="#" @click="logout()" :class="{'darkMode-link': darkMode}">Log out</a>
              </li>
              <li>
                <button @click="toogle()" :class="{'darkMode-button': darkMode}">Dark mode</button>
              </li>
            </ul>
          </div>
          <div class="column responsive-md" v-if="logged && toolbar">
            <div style="width: 65px">
              <MenuResponsive :isNewUser="isNewUser" :name="name" @click="toogle()" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import MenuResponsive from "@/components/MenuResponsive.vue";

export default {
  components: {
    MenuResponsive,
  },
  data() {
    return {
      toolbar: true,
      logged: true,
      name: "",
      isNewUser: false,
      darkMode: false,
    };
  },
  created() {
    this.darkMode = this.$store.getters.darkMode;
    this.$emit("click", this.darkMode);
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
      this.$store.commit("setDarkMode", false);
      this.$router.push("/");
    },
    toogle() {
      this.darkMode = !this.$store.getters.darkMode;
      this.$store.commit("setDarkMode", this.darkMode);
      this.$emit("click", this.darkMode);
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