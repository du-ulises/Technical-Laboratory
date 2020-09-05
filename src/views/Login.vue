<template>
  <main>
    <section class="full flex">
      <div class="column image">
        <img src="@/assets/images/art.png" />
        <p class="fade-in">By Diego Ulises Martínez</p>
      </div>
      <keep-alive>
        <component @click="handleClick" :is="renderedComponent" />
      </keep-alive>
    </section>
  </main>
</template>

<script>
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";

export default {
  components: {
    Login,
    Register,
  },
  methods: {
    handleClick(info) {
      if (info === "login") {
        this.renderedComponent = "Register";
      } else {
        this.renderedComponent = "Login";
      }
    },
  },
  data() {
    return {
      renderedComponent: "Login",
    };
  },
};
</script>
<style lang="scss" scoped>
.image {
  width: 65%;
  flex-basis: 65%;
  position: relative;
  @media screen and (max-width: $break-small) {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }
  img {
    width: 100%;
    display: block;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: #fff;
    font-weight: 600;
  }
}
.text {
  align-self: center;
  flex-basis: 35%;
  align-items: center;
  justify-content: center;
  .content {
    width: 320px;
  }
}
ul.social {
  position: absolute;
  bottom: 40px;
  margin: 0;
  padding: 0;
  li {
    display: inline-block;
    margin: 0 10px;
    a {
      font-size: 30px;
      font-weight: normal;
      color: #424242;
    }
  }
}
span.error {
  padding: 0 20px;
  color: #f23c3c;
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}
</style>
