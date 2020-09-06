<template>
  <div class="home">
    <div class="row justify-center align-center">
      <h3 class="isShowingAll" v-if="currentType==='All'">¡Showing all pokemons!</h3>
      <div class="dropdown">
        <select class="dropdown-select" v-model="currentType" @change="getPokemons(currentType)">
          <option disabled value="All">Apply filter</option>
          <option
            class="dropdown-list-item"
            v-for="(type, i) in types"
            :value="type.name"
            :key="i"
          >{{ type.name }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-9">
        <div class="row" v-if="!loading">
          <div
            class="col-lg-4"
            v-show="pokemonsList.length !== 0 && !item.selected"
            v-for="(item, index) in pokemonsList"
            :key="index"
          >
            <card @click="handleClick" :item="item" />
          </div>
        </div>
        <div class="row" v-if="loading">
          <div class="col-lg-4" v-for="index in 7" :key="index">
            <div class="placeholder">
              <div class="skeleton"></div>
              <h3 style="margin: 5rem 0;">Loading...</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <div class="resume">
          <h2>Selected pokemons</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <h3>Name</h3>
                </th>
                <th>
                  <h3>Abilities</h3>
                </th>
                <th>
                  <h3>Actions</h3>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th colspan="3" class="borderTable"></th>
              </tr>
              <tr v-show="selectedList.length!==0" v-for="(item, i) in selectedList" :key="i">
                <th>{{item.pokemon.name}}</th>
                <td>{{ getAbilities(item.information.abilities) }}</td>
                <td>
                  <button class="button" @click="removeItem(item, i)">Remove</button>
                </td>
              </tr>
              <tr v-if="selectedList.length===0">
                <td colspan="3" class="text-center">
                  <p class="error" style="margin: 2rem 0; ">¡You haven't picked any pokemon yet!</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="button btn-outline-primary"
            @click="reloadAllPokemons()"
          >Reload list of all pokemons</button>
          <button
            class="button btn-outline-danger"
            @click="removeAll()"
          >Remove all selected pokemons</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import * as api from "../services/pokemonService";
import Card from "@/components/Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      types: [],
      currentType: "",
      pokemonsList: [],
      loading: true,
      selectedList: [],
    };
  },
  async created() {
    this.selectedList = this.$store.getters.selectedList;
    this.loading = true;
    const { data } = await api.getPokemonTypes();
    this.$store.commit("setPokemonTypes", data.results);
    data.results.forEach((element) => {
      if (element.name !== "shadow" && element.name !== "unknown") {
        this.types.push(element);
      }
    });
    // this.currentType = this.types[0].name;
    // await this.getPokemons(this.currentType);
    await this.reloadAllPokemons()
  },
  methods: {
    async getPokemons(currentType) {
      try {
        this.loading = true;
        api.getPokemonTypeById(currentType).then(async (response) => {
          let list = response.data.pokemon.splice(0, 12);
          let descriptions = [];
          await Promise.all(
            list.map(async (item) =>
              descriptions.push(
                await api.getPokemonDescription(item.pokemon.name)
              )
            )
          );
          let information = [];
          await Promise.all(
            list.map(async (item) =>
              information.push(await api.getPokemonById(item.pokemon.name))
            )
          );
          list.forEach((pokemon, index) => {
            list[index].information = information[index].data;
            list[index].description = descriptions[index].data;
            list[index].selected = false;
          });

          this.$store.commit("setPokemons", list);
          this.pokemonsList = list;

          this.loading = false;
        });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    handleClick(item) {
      this.selectedList.push(item);
      this.$store.commit("setSelectedList", this.selectedList);
      let selectedItem = this.pokemonsList.find(
        (x) => x.information.id === item.information.id
      );
      selectedItem.selected = true;
      this.pokemonsList[selectedItem] = selectedItem;
      this.$store.commit("setPokemons", this.pokemonsList);
    },
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
    removeItem(item, i) {
      this.selectedList.splice(i, 1);
      this.$store.commit("setSelectedList", this.selectedList);
      let selectedItem = this.pokemonsList.find(
        (x) => x.information.id === item.information.id
      );
      selectedItem.selected = false;
      this.pokemonsList[selectedItem] = selectedItem;
      this.$store.commit("setPokemons", this.pokemonsList);
    },
    removeAll() {
      this.selectedList = [];
      this.$store.commit("setSelectedList", this.selectedList);
    },
    async reloadAllPokemons() {
      try {
        this.loading = true;
        api.getAllPokemon(12).then(async (response) => {
          let list = [];
          response.data.results.forEach((element) => {
            list.push({ pokemon: element });
          });
          let descriptions = [];
          await Promise.all(
            list.map(async (item) =>
              descriptions.push(
                await api.getPokemonDescription(item.pokemon.name)
              )
            )
          );
          let information = [];
          await Promise.all(
            list.map(async (item) =>
              information.push(await api.getPokemonById(item.pokemon.name))
            )
          );
          list.forEach((pokemon, index) => {
            list[index].information = information[index].data;
            list[index].description = descriptions[index].data;
            list[index].selected = false;
          });

          this.$store.commit("setPokemons", list);
          this.pokemonsList = list;

          this.loading = false;
          this.currentType = "All";
        });
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.home {
  margin-top: 100px;
  text-align: center;
  min-height: 100%;
  width: 100%;
  background: $color-primary;
  display: inline-table;
  .resume {
    margin: 1rem;
    background: $color-light;
    box-shadow: $shadow;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 7px 30px -10px rgba(255, 255, 255, 0.9);
    border: 1px solid #f1f1f188;
    table {
      width: 100%;
      margin-bottom: 1rem;
      th,
      td {
        border: none;
      }
      tr {
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
    .borderTable {
      height: 2px;
      background: $color-secondary;
      border-radius: 50%;
    }

    th {
      height: 50px;
    }
  }
}
.isShowingAll {
  color: $color-light;
  margin-right: 1rem;
  margin-top: 1rem;
}
</style>