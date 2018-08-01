const state = {
  selected: {}
}

const getters = {}

const mutations = {
  setSelected (state, city) {
    state.selected = city
  },
  clearSelected (state) {
    state.selected = {}
  }
}

const actions = {
  setSelected ({ commit }, city) {
    commit('setSelected', city)
  },
  clearSelected ({ commit }) {
    commit('clearSelected')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
