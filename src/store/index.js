import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    additionalUserInfo: null,
    user: null,
    pokemons: [],
    pokemonTypes: [],
    selectedList: []
  },
  mutations: {
    setAdditionalUserInfo(state, t) {
      state.additionalUserInfo = t
    },
    setUser(state, user) {
      state.user = user
    },
    setPokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setPokemonTypes(state, pokemonTypes) {
      state.pokemonTypes = pokemonTypes
    },
    setSelectedList(state, selectedList) {
      state.selectedList = selectedList
    }
  },
  getters: {
    additionalUserInfo: state => {
      return state.additionalUserInfo
    },
    user: state => {
      return state.user
    },
    pokemons: state => {
      return state.pokemons
    },
    pokemonTypes: state => {
      return state.pokemonTypes
    },
    selectedList: state => {
      return state.selectedList
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
