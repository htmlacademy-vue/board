const state = {
  isAuthenticated: false,
  user: null
};
const actions = {
  logout: jest.fn()
};
const mutations = {
  setUser: (state, user) => state.user = user
};
const getters = {
  getUserAttribute: state => attr => state.user ? state.user[attr] : ''
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
