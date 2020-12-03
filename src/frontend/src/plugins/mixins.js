import Vue from 'vue';
import JWTService from '@/services/jwt.service';
import Notifier from '@/plugins/notifier';
import store from '@/store';
import {
  ReadOnlyApiService,
  AuthApiService,
  TaskApiService,
  CrudApiService
} from '@/services/api.service';

Vue.mixin({
  computed: {
    $jwt: () => JWTService,
    $notifier: () => new Notifier(store),
    $api() {
      return {
        users: new ReadOnlyApiService('users', this.$notifier),
        auth: new AuthApiService(this.$notifier),
        tasks: new TaskApiService(this.$notifier),
        columns: new CrudApiService('columns', this.$notifier),
        ticks: new CrudApiService('ticks', this.$notifier),
        comments: new CrudApiService('comments', this.$notifier)
      };
    }
  }
});
