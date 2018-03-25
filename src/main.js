// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://ajax_lv/';
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
axios.defaults.headers.common = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
};

//

//

router.beforeEach((to, from, next) => {

const userInfo = store.state.access_token;
const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

/*
if(requiresAuth && !userInfo) {
  next('/login');
} else if(requiresAuth && requiresAdmin) {
    store.dispatch('setTest');
    //const userIsAdmin = store.state.user.admin
    const userIsAdmin = store.state.userData.admin
    if(userIsAdmin == '1') {
      next()
    } else {
      next(from.path)
    }
} else if(to.path == '/login' && userInfo || to.path == '/register' && userInfo) {
  next('/')
} else {
  next();
}
*/
/*
    if(requiresAuth && !userInfo) {
        next('/login');
    } else if(requiresAuth && requiresAdmin) {
         store.dispatch('setTest')
            .then(() => {
                const userIsAdmin = store.state.userData.admin
                if(userIsAdmin == '1') {
                    next()
                } else {
                    next(from.path)
                }
            })
            .catch(() => {
                next('/')
            })
    } else if(to.path == '/login' && userInfo || to.path == '/register' && userInfo) {
        next('/')
    } else {
        next();
    }
*/

if(!requiresAuth || !requiresAuth && !requiresAdmin) {
   next()
   return
} else if(requiresAuth && !userInfo) {
  next('/login')
  return
}

store.dispatch('setTest')
  .then(() => {
    const userIsAdmin = store.state.userData.admin
    if(userIsAdmin == '1') {
        next()
    } else {
        next(from.path)
    }
  })
  .catch(() => {
      next('/')
  })

});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: { App }
});
