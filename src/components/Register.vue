<template>
    <div>
        <div class="col-md-8">
            <form class="form-horizontal">
                <div class="form-group">
                    <label for="name" class="control-label col-md-2">Name</label>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="name" v-model="user.name">
                    </div>
                </div>
                <div class="form-group">
                    <label for="name" class="control-label col-md-2">Email</label>
                    <div class="col-md-6">
                        <input type="email" class="form-control" id="email" v-model="user.email">
                    </div>
                </div>
                <div class="form-group">
                    <label for="name" class="control-label col-md-2">Password</label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" id="password" v-model="user.password">
                    </div>
                </div>
                <div class="form-group">
                    <label for="name" class="control-label col-md-2">Confirm Password</label>
                    <div class="col-md-6">
                        <input type="password" class="form-control" id="password_confirmation" v-model="user.password_confirmation">
                    </div>
                </div>
                <div class="form-group">
                    <a href="#" @click="register(user)" class="btn btn-success">Register</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '../store'

    export default {
        name: 'Register',
        data() {
           return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods: {
            login(user) {
              let data = {
                  client_id: 2,
                  client_secret: 'DHXDZnrTflfTZFVRs8PMLUAAazzEhUUEXfu8mOD0',
                  grant_type: 'password',
                  username: user.email,
                  password: user.password
              }
              axios.post('http://127.0.0.1:8000/oauth/token', data)
                  .then(response => {
                      store.commit('setToken', {
                          access_token: response.data.access_token,
                          expires_in: response.data.expires_in + Date.now()
                      })
                      this.fetchInfo()
                  })
                  .catch(e => {
                      console.log('Fails: ' + e)
                  })
                this.$router.push('/')
            },
            fetchInfo() {
                let headers = { headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                    }
                }
                axios.get('http://127.0.0.1:8000/api/user', headers)
                    .then(response => {
                        store.commit('setUserData', {data: response.data})
                    })
                    .catch(e => {
                        console.log('This is error: ' + e.response)
                    })
            },
            register(user) {
                axios.post('http://127.0.0.1:8000/api/register', user)
                    .then(response => {
                        if(response.data.success === true)
                        console.log('User register - ' + response.data.success)
                        this.login(user)
                    })
                    .catch(e => {
                        console.log('error: ' + e)
                    })
            }
        }
    }
</script>