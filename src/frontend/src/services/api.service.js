import Vue from 'vue';
import JwtService from '@/services/jwt.service';
import taskStatuses from '@/common/enums/taskStatuses';
import timeStatuses from '@/common/enums/timeStatuses';

class BaseApiService {
  #notifier;
  constructor(notifier) {
    this.#notifier = notifier;
  }

  handleErrors(err) {
    const defaultMessage = 'Возникла ошибка при выполнении запроса к серверу';
    this.#notifier.error(err || defaultMessage);
  }
}

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }
  setAuthHeader() {
    const token = JwtService.getToken();
    Vue.axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  }

  async login(params) {
    try {
      const { data } = await Vue.axios.post('login', params);
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }

  async logout() {
    try {
      const { data } = await Vue.axios.delete('logout');
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }

  async getMe() {
    try {
      const { data } = await Vue.axios.get('whoAmI');
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }
}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    try {
      const { data } = await Vue.axios.get(this.#resource, config);
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }

  async get(id, config = {}) {
    try {
      const { data } = await Vue.axios.get(`${this.#resource}/${id}`, config);
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    try {
      const { data } = await Vue.axios.post(this.#resource, entity);
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }

  async put(entity) {
    try {
      const { data } = await Vue.axios.put(
        `${this.#resource}/${entity.id}`,
        entity
      );
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }

  async delete(id) {
    try {
      const { data } = await Vue.axios.delete(`${this.#resource}/${id}`);
      return data;
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }
}

export class TaskApiService extends CrudApiService {
  constructor(notifier) {
    super('tasks', notifier);
  }

  static getTimeStatus(dueDate) {
    if (!dueDate) {
      return '';
    }
    const currentTime = +new Date();
    const taskTime = Date.parse(dueDate);
    const timeDelta = currentTime - taskTime;
    const oneDay = 24 * 60 * 60 * 1000;
    if (timeDelta > oneDay) {
      return '';
    }
    return timeDelta < 0 ? timeStatuses.expired : timeStatuses.deadline;
  }

  async query(config = {}) {
    const tasks = await super.query(config);
    return tasks.map(task => ({
      ...task,
      status: taskStatuses[task.statusId],
      timeStatus: TaskApiService.getTimeStatus(task.dueDate)
    }));
  }

  async post(task) {
    try {
      const { data: newTask } = await Vue.axios.post('tasks', task);
      return {
        ...newTask,
        status: taskStatuses[newTask.statusId],
        timeStatus: TaskApiService.getTimeStatus(newTask.dueDate)
      };
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }
  async put(task) {
    try {
      await Vue.axios.put(`tasks/${task.id}`, task);
      return {
        ...task,
        status: taskStatuses[task.statusId],
        timeStatus: TaskApiService.getTimeStatus(task.dueDate)
      };
    } catch (e) {
      this.handleErrors(e?.response?.data?.error?.message);
      throw Error(e);
    }
  }
}
