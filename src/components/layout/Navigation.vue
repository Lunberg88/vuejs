<template>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-light nav-border">
        <a class="navbar-brand" href="#">VueJS Project</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav">
                <router-link to="/" tag="li" exact-active-class="nav-item active"><a class="nav-link">Home</a></router-link>
                <router-link to="/static" tag="li" active-class="nav-itemactive"><a class="nav-link">Static</a></router-link>
                <router-link to="/news" tag="li" active-class="nav-itemactive"><a class="nav-link">News</a></router-link>
                <router-link to="/user/root" tag="li" active-class="nav-itemactive"><a class="nav-link">User</a></router-link>
                <router-link to="/profile" tag="li" active-class="nav-itemactive"><a class="nav-link">Profile</a></router-link>
            </ul>
            <ul class="navbar-nav mr-auto d-none d-lg-block">
                <li v-show="auth" class="float-right">
                    <form class="form-inline mt-2 mt-md-0 col-md-push-4">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                    </form>
                </li>
            </ul>
            <ul class="navbar-nav pull-right">
                <router-link to="/register" tag="li" active-class="nav-itemactive" v-show="!auth" v-if="!auth"><a class="nav-link">SignUp</a></router-link>
                <router-link to="/admin" tag="li" v-show="auth" v-if="isAdmin" data-id="dash"><a class="btn btn-primary">Dashboard</a></router-link>
                <router-link to="/login" tag="li" active-class="nav-itemactive" v-show="!auth" v-if="!auth"><a class="nav-link">SignIn</a></router-link>
                <li>
                    <a href="#" @click.prevent="loggOut" v-show="auth" class="btn btn-outline-secondary"><b>Logout</b></a>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'Navigation',
    props: ['auth', 'isAdmin'],
    methods: {
        loggOut() {
            this.$emit('logOut');
        }
    }
}
</script>
<style type="less">
    body {
        background: #eee !important;
    }
    // Box-Shadow style #2
    //    box-shadow: 0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12);
</style>
<style scoped>
    .nav-border {
        box-shadow: 0 1px 4px 0 rgba(0,0,0,.14);
    }

    .navbar-nav.pull-right li[data-id="dash"] {
        padding-right: 10px;
    }
</style>
