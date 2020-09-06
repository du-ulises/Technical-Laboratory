<template>
  <div class="notFoundContainer">
    <div class="image404">
      <img src="@/assets/images/snorlax.jpg" />
    </div>
    <div class="fade-in">
      <div class="row justify-center">
        <img class="logo" alt="Vue logo" src="../assets/images/pokemon-logo.png" />
      </div>
      <div class="title fade-in">404</div>
      <h1 style="color: #fff" class="lost">You got lost?</h1>
      <br />
      <p style="color: #fff" class="text">
        We can't find the page you're looking for.
        <router-link
          class="notFoundLink"
          :to="logged ? '/home' : '/'"
        >{{logged ? "Return to home page" : "Log in"}}</router-link>
      </p>
    </div>

    <br />
  </div>
</template>

<script>
export default {
  name: "NotFound",
  components: {},
  data() {
    return {
      logged: false,
    };
  },
  created() {
    if (this.$store.getters.user) this.logged = true;
    else this.logged = false;
  },
};
</script>
<style lang="scss" scoped>
.logo {
  width: 25%;
  @media screen and (max-width: $break-medium) {
    width: 38%;
  }
  @media screen and (max-width: $break-small) {
    width: 50%;
  }
}
.title {
  font-weight: bolder;
  font-size: 18rem;
  text-shadow: $shadow-light;
  @media screen and (max-width: $break-medium) {
    font-size: 15rem;
  }
  @media screen and (max-width: $break-small) {
    font-size: 10rem;
  }
}
.notFoundContainer {
  min-height: 100vh;
  width: 100%;
  text-align: center;
  padding-top: 100px;
  display: grid;
  align-items: center;
}
.image404 {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  filter: blur(8px);
  -webkit-filter: blur(8px);
}
.notFoundLink {
  color: $color-secondary;
}
.lost {
  font-weight: 600;
  font-size: 4rem;
  margin-top: -3rem;
}
.text {
  font-size: 1.5rem;
  margin-bottom: 4rem;
  font-weight: 300;
}
</style>