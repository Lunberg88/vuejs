<template>
  <div id="app">
    <Navigation :auth="auth" :isAdmin="isAdmin" @logOut="logOut" />
    <div class="container container-fluid container-body">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>
<script>
import Navigation from '@/components/layout/Navigation'
import store from './store'

export default {
  name: 'app',
  components: { Navigation },
    computed: {
      auth() {
          return this.$store.state.access_token
      },
      isAdmin() {
          //if(this.$store.state.user && this.$store.state.user.admin == '1') {
          if(store.state.userData != null && store.state.userData.admin == '1') {
              return true;
          } else {
              return false;
          }
      }
    },
    methods: {
      logOut() {
          store.commit('removeUserData')
          this.$router.push('/login')
      }
    }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container-body {
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 3px;
  margin-top: 70px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
