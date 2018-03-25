<template>
	<div class="row">
		<div class="col-md-5 login-form">
			<div class="panel panel-default card card-body form-auth">
				<div class="panel-title">
					<h3>Login Form</h3>
				</div>
				<div class="clearfix"></div>
				<br>
				<form @submit.prevent="login">
					<div class="form-group row">
						<label for="email" class="col-md-3 col-form-label">Email:</label>
						<div class="col-md-9">
							<input type="text" id="email" class="form-control"
							v-model="user.email"
							placeholder="email@example.com">
						</div>
					</div>
					<div class="form-group row">
						<label for="password" class="col-md-3 col-form-label">Password:</label>
						<div class="col-md-9">
							<input type="password" id="password" class="form-control"
							v-model="user.password"
							placeholder="******">
						</div>
					</div>
					<div class="form-group row">
						<div class="col-md-12 pull-right">
							<button class="btn btn-primary col-md-4 btn-sm">Login</button>
						</div>
					</div>
				</form>
			</div>
			<span class="isload" v-if="isLoad">
				<i class="fa fa-refresh fa-spin"></i>
				<h4>Connection...</h4>
			</span>
		</div>
	</div>
</template>
<script>
import axios from 'axios'
import store from '../store'

export default {
		data() {
			return {
				user: {
					email: '',
					password: ''
				},
                isLoad: false
			}
		},
		methods: {
			login() {
			    this.isLoad = true
				let data = {
					client_id: 2,
					client_secret: 'zaqeECeZpTumPALGUAljAOdkDHgW0OPcIngjq3V6',
					grant_type: 'password',
					username: this.user.email,
					password: this.user.password
				}
				axios.post('http://ajax_lv/oauth/token', data)
				.then(response => {
					if(response.data) {
					    store.commit('setToken', {
							access_token: response.data.access_token,
							expires_in: response.data.expires_in + Date.now()
						})
					}
					//console.log('access_token is: ' + this.$store.state.access_token)
          store.dispatch('setUser', {db: response.data})
					this.getUserAuth()
					this.isLoad = false
					this.$router.push('/')
				}).catch(e => {
				    this.isLoad = false;
					console.log('Errors: ' + e);
				})
			},
			getUserAuth() {
			    let headers = {headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('access_token')
					}
				};
				axios.get('http://ajax_lv/api/user', headers)
				.then(response => {
					store.dispatch('setUserDataInfo', {data: response.data})
				})
				.catch(e => {
					console.log('This is error: ' + e.response)
				})
			}
		}
	}
</script>
<style>
	.login-form {
		margin: auto;
		position: relative;
	}

	.panel-default {
		margin: 20% auto;
	}

	.form-auth {
		border: 0 !important;
	}

	ul > li {
		text-align: left;
	}

	ul > li:first-child {
		text-align: center;
	}

	.form-group:nth-child(3) {
		text-align: right;
	}

	.isload {
		display: block;
		top: 25%;
		left: 5%;
		position: absolute;
		color: #788c8f;
		background: #fff;
		z-index: 999;
		width: 100%;
		padding: 50px 60px;
		/*
		box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
		*/
	}

	.isload > i {
		font-size: 64px;
	}

	.isload > h4 {
		padding-top: 8px;
	}
</style>
