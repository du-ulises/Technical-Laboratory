import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    additionalUserInfo: null,
    id: null,
    user: null
  },
  mutations: {
    setAdditionalUserInfo(state, t) {
      state.additionalUserInfo = t
    },
    setId(state, id) {
      state.id = id
    },
    setUser(state, user) {
      state.user = user
    }
  },
  getters: {
    additionalUserInfo: state => {
      return state.additionalUserInfo
    },
    loggedId: state => {
      return state.id
    },
    user: state => {
      return state.user
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
})
