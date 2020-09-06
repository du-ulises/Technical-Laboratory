<template>
  <div class="containerDetails">
    <div class="pokemonImage">
      <img
        v-if="item"
        class="fade-in"
        :src="`${url}/${item.description.id}.png`"
        :alt="item.pokemon.name"
      />
    </div>
    <div class="fade-in details">
      <div class="row">
        <div class="col-lg-3 center">
          <div class="column">
            <img
              class="fade-in center image"
              :src="`${url}/${item.description.id}.png`"
              :alt="item.pokemon.name"
            />
          </div>
        </div>
        <div class="col-lg-9 center" style="padding: 1rem;">
          <div class="card">
            <div class="header-card">
              <h2>{{item.pokemon.name}}</h2>
            </div>
            <div class="body-card">
              <div class="content-card">
                <h4>Description</h4>
                <p
                  style="margin-bottom: 0.5rem;"
                >{{item.description.flavor_text_entries[0].flavor_text}}</p>
                <h4>Abilities</h4>
                <p style="margin-bottom: 0.5rem;">{{ getAbilities(item.information.abilities) }}</p>
                <h4>Types</h4>
                <p style="margin-bottom: 0.5rem;">{{ getTypes(item.information.types) }}</p>
                <p style="margin-top: 1.5rem;">
                  <router-link class="goBack" to="/home">Return to home page</router-link>
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
import { environment } from "@/environments/environment";

export default {
  name: "NotFound",
  components: {},
  data() {
    return {
      logged: false,
      item: null,
      url: environment.apiImages,
    };
  },
  created() {
    if (this.$store.getters.user) {
      this.logged = true;
      this.item = this.$store.getters.pokemonDetails;
    } else this.logged = false;
  },
  methods: {
    getAbilities(abilities) {
      let list = "";
      abilities.forEach((item, index) => {
        if (abilities.length === index + 1) {
          list = list + item.ability.name + ".";
        } else {
          list = list + item.ability.name + ", ";
        }
      });
      return list;
    },
    getTypes(types) {
      let list = "";
      types.forEach((item, index) => {
        if (types.length === index + 1) {
          list = list + item.type.name + ".";
        } else {
          list = list + item.type.name + ", ";
        }
      });
      return list;
    },
  },
};
</script>
<style lang="scss" scoped>
.containerDetails {
  min-height: 100vh;
  text-align: center;
  padding-top: 100px;
  display: grid;
  align-items: center;
  background: $color;
  .details {
    z-index: 2;
  }
  position: relative;
}
.pokemonImage {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 0;
  filter: blur(16px);
  -webkit-filter: blur(16px);
}
.image {
  padding: 1rem;
  width: 100%;
  &:hover {
    transform: scale(0.98);
    transition: 0.2s ease;
    opacity: 0.9;
  }
}
.goBack {
  color: $color-primary;
  text-shadow: $shadow;
  margin: 2rem;
}
.card {
  box-shadow: $shadow;
  border-radius: 8px;
  box-shadow: 0 7px 30px -10px rgba(255, 255, 255, 0.9);
  border: 1px solid #f1f1f188;
}
.header-card {
  background: $color-light;
  opacity: 80%;
  width: 100%;
  padding: 1rem;
  filter: blur(24%);
  -webkit-filter: blur(24%);
  border-radius: 8px 8px 0 0;
  text-transform: capitalize;
}
.body-card {
  width: 100%;
  padding: 2rem;
  border-radius: 0 0 8px 8px;
  background: $bg-light;
  opacity: 50%;
}
.content-card {
  opacity: 100%;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>