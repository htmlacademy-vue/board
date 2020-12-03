import auth from '@/middlewares/auth';
import isLoggedIn from '@/middlewares/isLoggedIn';

export default {
  AUTH: auth,
  IS_LOGGED_IN: isLoggedIn
};
