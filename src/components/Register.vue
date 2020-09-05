<template>
  <div class="column flex text">
    <div class="content fade-in">
      <div class="text-center">
        <img class="pokemon-logo-banner fade-in" src="@/assets/images/pokemon-logo.png" />
      </div>
      <h1 class="text-center">
        <strong>Sign up</strong> here
      </h1>

      <form @submit.prevent="register">
        <!-- <ValidationProvider rules="required" v-slot="v">
          <span class="error" v-if="v.errors[0]">{{ v.errors[0] }}</span>
          <input
            type="text"
            name="Username"
            placeholder="Username"
            v-model="username"
            :class="{ error: v.errors[0] }"
          />
        </ValidationProvider>-->
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
        <ValidationProvider rules="required" v-slot="v">
          <span class="error" v-if="v.errors[0]">{{ v.errors[0] }}</span>
          <input
            type="password"
            name="Password"
            placeholder="Password"
            v-model="password"
            :class="{ error: v.errors[0] }"
          />
        </ValidationProvider>
        <ValidationProvider rules="required" v-slot="v">
          <span
            class="error"
            v-if="v.errors[0] || !match"
          >{{ v.errors[0] ? v.errors[0] : !match ? 'Passwords do not match' : '' }}</span>
          <input
            type="password"
            name="Confirm password"
            placeholder="Confirm password"
            v-model="confirmPassword"
            :class="{ error: v.errors[0] || !match }"
            @click.capture="clearError()"
          />
        </ValidationProvider>

        <p class="text-center error" v-show="error">{{ error }}</p>
        <button
          type="submit"
          class="fade-in"
          :class="{'button-disabled': isFormValidated()}"
          :disabled="isFormValidated()"
        >Sign in</button>
      </form>
      <p class="text-center">or if you already have an account</p>
      <p class="text-center">
        <a style="cursor: pointer" class="ref" @click="handleClick">Login with your account</a>
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
      username: "",
      password: "",
      confirmPassword: "",
      error: false,
      match: true,
    };
  },
  components: {
    ValidationProvider,
    Social,
  },
  methods: {
    handleClick() {
      this.$emit("click", "register");
    },
    isFormValidated() {
      if (
        this.password !== "" &&
        this.confirmPassword !== "" &&
        this.email !== ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    clearError() {
      this.match = true;
    },
    async register() {
      if (this.password != this.confirmPassword) {
        this.match = false;
        return;
      } else {
        this.match = true;
        try {
          const response = await firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password);
          this.$store.commit(
            "setAdditionalUserInfo",
            response.additionalUserInfo
          );
          this.$store.commit("setUser", response.user);
          this.$router.push("/home");
        } catch (error) {
          switch (error.code) {
            case "auth/email-already-in-use":
              this.error = "This user is already registered";
              break;
            default:
              this.error = error.message;
          }
        }
      }
    },
  },
};
</script>
