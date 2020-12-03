import JWTService from '@/services/jwt.service';
import Notifier from '@/plugins/notifier';
import { $api } from '@/services/api.service';
import notifier from '@/plugins/notifier';
import {
  ReadOnlyApiService,
  AuthApiService,
  TaskApiService,
  CrudApiService
} from '@/services/api.service';

export default function(store) {
  try {
    store.$jwt = JWTService;
    store.$notifier = new Notifier(store);
    store.$api = {
      users: new ReadOnlyApiService('users', store.$notifier),
      auth: new AuthApiService(store.$notifier),
      tasks: new TaskApiService(store.$notifier),
      columns: new CrudApiService('columns', store.$notifier),
      ticks: new CrudApiService('ticks', store.$notifier),
      comments: new CrudApiService('comments', store.$notifier)
    };
  } catch (e) {
    console.error(e);
  }
}
