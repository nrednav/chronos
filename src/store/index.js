import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    darkThemeEnabled: false
  },
  mutations: {
    toggleDarkTheme(state) {
      state.darkThemeEnabled = !state.darkThemeEnabled;
    }
  },
  actions: {},
  modules: {}
});
