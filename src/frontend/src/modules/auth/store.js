const SET_ENTITY = 'SET_ENTITY';

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    user: null
  },

  mutations: {
    [SET_ENTITY](state, { entity, value }) {
      state[entity] = value;
    }
  },

  getters: {
    getUserAttribute: state => attr => state.user ? state.user[attr] : ''
  },

  actions: {
    async login({ commit, dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      commit(SET_ENTITY, { entity: 'isAuthenticated', value: true });
      dispatch('getMe');
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(SET_ENTITY, { entity: 'isAuthenticated', value: false });
      commit(SET_ENTITY, { entity: 'user', value: null });
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(SET_ENTITY, { entity: 'user', value: data });
      } catch {
        // Note: in case of not proper login, i.e. token is expired
        dispatch('logout', false);
      }
    }
  }
};
