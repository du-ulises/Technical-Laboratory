<template>
  <div class="column flex text">
    <div class="content fade-in">
      <div class="text-center">
        <img class="pokemon-logo-banner fade-in" src="@/assets/images/pokemon-logo.png" />
      </div>
      <h1 class="text-center">
        <strong>Login</strong> to your
        <strong>account</strong>
      </h1>

      <form @submit.prevent="login">
        <ValidationProvider rules="email|required" v-slot="v">
          <span class="error" v-if="v.errors[0]">{{ v.errors[0] }}</span>
          <input
            type="email"
            name="E-mail"
            placeholder="E-mail"
            v-model="email"
            :class="{ error: v.errors[0] }"
          />
        </ValidationProvider>
        <ValidationProvider v-slot="v">
          <span class="error" v-if="v.errors[0]">{{ v.errors[0] }}</span>
          <input type="password" placeholder="Password" v-model="password" />
        </ValidationProvider>
        <p class="text-center error" v-show="error">{{ error }}</p>
        <button
          type="submit"
          class="fade-in"
          :class="{'button-disabled': isFormValidated()}"
          :disabled="isFormValidated()"
        >Log in</button>
      </form>
      <p class="text-center">or you can also</p>
      <p class="text-center">
        <a style="cursor: pointer" class="ref" @click="handleClick">Create your account</a>
      </p>
    </div>
    <Social />
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import Social from "./Social.vue";

import firebase from "firebase/app";
import "firebase/auth";

extend("required", {
  ...required,
  message: "Your {_field_} is required",
});

extend("email", {
  ...email,
  message: "Your {_field_} is invalid",
});

export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  components: {
    ValidationProvider,
    Social,
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
        this.$store.commit(
          "setAdditionalUserInfo",
          response.additionalUserInfo
        );
        this.$store.commit("setUser", response.user);
        this.$router.push("/home");
      } catch (error) {
        this.error = error.message;
      }
    },
    handleClick() {
      this.$emit("click", "login");
    },
    isFormValidated() {
      if (this.password !== "" && this.email !== "") {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>