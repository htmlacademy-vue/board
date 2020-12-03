export default function auth({ next, store }) {
  if (store.$jwt.getToken()) {
    next('/');
  }
  return next();
}
