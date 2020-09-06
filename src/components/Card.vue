<template>
  <div class="card fade-in">
    <div class="column">
      <div class="figure">
        <div class="point">
          <div class="pointWhite"></div>
        </div>
      </div>
      <img class="fade-in" :src="`${url}/${item.description.id}.png`" :alt="item.pokemon.name" />
    </div>
    <div class="column">
      <h2>{{ item.pokemon.name}}</h2>
      <h4>Description</h4>
      <p style="margin-bottom: 0.5rem;">{{item.description.flavor_text_entries[0].flavor_text}}</p>
      <h4>Abilities</h4>
      <p style="margin-bottom: 0.5rem;">{{ getAbilities(item.information.abilities) }}</p>
      <h4>Types</h4>
      <div class="text">
        <p style="margin-bottom: 0.5rem;">{{ getTypes(item.information.types) }}</p>
      </div>
      <div class="buttons">
        <button class="button" @click="handleClick(item)">Choose pokemon</button>
        <router-link :to="`/pokemon-detail/${item.name}`">Go to details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { environment } from "@/environments/environment";

export default {
  props: ["item"],
  data() {
    return {
      url: environment.apiImages,
    };
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
    handleClick(item) {
      this.$emit("click", item);
    }
  },
};
</script>

<style scoped lang="scss">
.card {
  margin: 1rem;
  background: $bg-light;
  box-shadow: $shadow;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 7px 30px -10px rgba(255, 255, 255, 0.9);
  border: 1px solid #f1f1f188;
  .figure {
    position: absolute;
    padding: 1rem;
    border-radius: 50%;
    background: #217b78;
    border: 1px solid #000;
    background: linear-gradient(
      -5deg,
      $color-light,
      $color-light 49%,
      black 49%,
      black 51%,
      rgb(197, 0, 0) 51%
    );
    z-index: 2;
    transition: all .2s ease-in-out;
    opacity: 0.8;
    box-shadow: $shadow;
    &:hover{
      opacity: 1;
      transform: rotate(15deg) scale(0.95);
    }
    .point {
      background: #000;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .pointWhite {
        background: #fff;
        width: 4px;
        height: 4px;
        border-radius: 50%;
      }
    }
  }
  img {
    width: 100%;
    &:hover {
      transform: scale(0.96);
      transition: 0.2s ease;
      opacity: 0.9;
    }
  }
}
</style>