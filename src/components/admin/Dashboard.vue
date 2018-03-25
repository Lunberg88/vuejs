<template>
	<div>
		<div class="row">
			<div class="col-md-2">
				<ul class="nav nav-pills nav-pills-info nav-pills-icons flex-column">
					<li class="nav-item"><router-link to="/admin/candidates" tag="a" exact-active-class="active show" class="nav-link"><i class="fa fa-user"></i> Candidate</router-link></li>
					<li class="nav-item"><router-link to="/admin/candidates/addnew" tag="a" active-class="active show" class="nav-link"><i class="fa fa-user-plus"></i> Add Candidate</router-link></li>
					<li class="nav-item"><router-link to="/admin/openings" tag="a" active-class="active show" class="nav-link"><i class="fa fa-file"></i> Openings</router-link></li>
					<li class="nav-item"><router-link to="/admin/messages" tag="a" active-class="active show" class="nav-link"><i class="fa fa-envelope"></i> Messages</router-link></li>
					<li class="nav-item"><router-link to="/admin/history" tag="a" active-class="active show" class="nav-link"><i class="fa fa-history"></i> History</router-link></li>
				</ul>
			</div>
			<div class="col-md-10">
				<transition name="fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Dashboard',
	data() {
		return {
			title: 'VueJS Dashboard',
		}
	},
	beforeCreate() {
	    axios.get('http://ajax_lv/api/user/permission')
			.then(res => {
			    if(!res.data == '1') {
			        return this.$router.push('/');
				}
			})
			.catch(e => {
			    console.log('error');
			})
	}
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
	transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
	opacity: 0;
}

div.list-group > a {
	-webkit-transition: color .4s;
	transition: color .4s;
}

div.list-group > a {
	text-align: left;
}

.nav-pills, .nav-tabs {
	border: 0;
	border-radius: 3px;
	padding: 0 15px;
}

.flex-column {
	flex-direction: column!important;
}

.nav {
	display: flex;
	flex-wrap: wrap;
	padding-left: 0;
	margin-bottom: 0;
	list-style: none;
}

.nav .nav-item {
	position: relative;
}


.nav-pills.nav-pills-info .nav-item .nav-link.active,
.nav-pills.nav-pills-info .nav-item .nav-link.active:focus,
.nav-pills.nav-pills-info .nav-item .nav-link.active:hover {
	background-color: #00bcd4;
	box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(0,188,212,.4);
	color: #fff;
}

.nav-pills.nav-pills-icons .nav-item .nav-link {
	border-radius: 4px;
}

.nav-pills .nav-item .nav-link.active {
	color: #fff;
	background-color: #9c27b0;
	box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px rgba(156,39,176,.4);
}

.nav-pills .nav-item .nav-link {
	line-height: 24px;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 500;
	min-width: 100px;
	text-align: center;
	color: #555;
	transition: all .3s;
	border-radius: 30px;
	padding: 10px 15px;
}

.nav-pills .nav-link.active, .nav-pills .show > .nav-link {
	color: #fff;
	background-color: #2196f3;
}

.nav-pills .nav-link, .nav-tabs .nav-link {
	padding: 1.4286em .8575em;
	font-size: .875rem;
	font-weight: 500;
	border: 0;
}

.nav-link {
	display: block;
	padding: .5rem 1rem;
}

.nav-pills .nav-item i {
	display: block;
	font-size: 30px;
	padding: 15px 0;
}

a .material-icons {
	vertical-align: middle;
}

.nav-pills .nav-item .nav-link:hover {
	background-color: hsla(0,0%,78%,.2);
}
</style>
