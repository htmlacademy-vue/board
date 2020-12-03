const state = {
  tasks: [],
  filters: {
    search: '',
    users: [],
    statuses: []
  }
};
const actions = {};
const getters = {
  UPDATE_FILTERS: () => {},
  filteredTasks: () => []
};

export default {
  state,
  actions,
  getters,
  namespaced: true
};
