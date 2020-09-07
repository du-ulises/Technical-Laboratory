<template>
  <div class="menuContent">
    <a href="#">
      <button class="header--button" v-if="show" key="on" @click="show = false">
        <svg viewBox="0 0 24 24" class="header--icon">
          <title>Close</title>
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill="currentColor"
            d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
          />
        </svg>
      </button>
      <button class="header--button" v-else key="off" @click="show = true">
        <svg viewBox="0 0 24 24" class="header--icon">
          <title>Navigation Menu</title>
          <path
            fill="currentColor"
            d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"
          />
        </svg>
      </button>
    </a>
    <!-- Dropdown Menu -->
    <transition name="dropdown">
      <div class="dropdown__menu" v-bind:class="{ active: show }" v-if="show">
        <div class="dropdown__menu-item">
          <a href="#" class="dropdown__menu-link" title="Account">
            <div class="dropdown__menu-svg">
              <svg viewBox="0 0 496 512">
                <path
                  fill="currentColor"
                  d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
                />
              </svg>
            </div>
            <div class="dropdown__menu-text">{{isNewUser ? "Welcome" : "Hello"}} {{name}}</div>
          </a>
        </div>
        <div class="dropdown__menu-item">
          <router-link to="/home" class="dropdown__menu-link">Home</router-link>
        </div>
        <div class="dropdown__menu-item">
          <router-link to="/home" class="dropdown__menu-link">Skills</router-link>
        </div>
        <div class="dropdown__menu-item">
          <a href="#" @click="logout()" class="dropdown__menu-link">Log out</a>
        </div>
        <div class="dropdown__menu-item">
          <a href="#" @click="toogle()" class="dropdown__menu-link">Dark mode</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["isNewUser", "name"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    logout() {
      this.$store.commit("setUser", null);
      this.$store.commit("setSelectedList", []);
      this.$store.commit("setDarkMode", false);
      this.$router.push("/");
    },
    toogle() {
      this.$emit("click", "toogle");
    },
  },
};
</script>

<style lang="scss" scoped>
hr {
  border: 0;
  height: 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--color-gray);
}

// Header Menu
.menuContent {
  position: fixed;
  top: 1.9rem;
  right: 1rem;
}
.header {
  &--icon {
    width: 1.65rem;
    height: 1.65rem;
  }
  &--button {
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    color: gray;
    cursor: pointer;
    border: 1px solid transparent;
    background-color: transparent;
    &:focus {
      outline: 0;
    }
  }
}

// Dropdown Menu

.dropdown__menu {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;
  min-width: 300px;
  margin-top: 1rem;
  overflow-y: auto;
  padding: 2rem 1rem 2rem 0rem;
  border-radius: 12px;
  background-color: white;
  border: 1px solid var(--color-gray);
  background-clip: padding-box;
  &-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.6);
    padding: 0.8rem 0 0.8rem 2rem;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
    border-radius: 0 50px 50px 0;
    &:hover {
      color: $color-primary;
      background-color: rgba(79, 192, 141, 0.1);
    }
  }
  &-svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  &-text {
    font-weight: 300;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

// Animation Menu Icon

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.6s;
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
.slide-fade-enter {
  transform: translateX(31px);
}
.slide-fade-leave-active {
  transform: translateX(-31px);
}

// Dropdown Menu Animation

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 1s;
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>