<template>
    <div>
        <div class="row">
            <div class="col-md-offset-9 col-md-3">
                <label v-if="errors" class="label label-danger" v-for="error in errors">
                    {{ error }}
                </label>
                <label v-if="messages" class="label label-success" v-for="message in messages">
                    {{ message }}
                </label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label class="control-label col-md-4">#id</label>
                        <div class="col-md-8 pull-left">
                            <strong>{{ userName.id }}</strong>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-4">admin:</label>
                        <div class="col-md-8 pull-left">
                            <strong>{{ userName.admin ? true : false}}</strong>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-md-4 control-label">
                            Name
                        </label>
                        <div class="col-md-8">
                            <input type="text" id="name" class="form-control" v-model="userName.name" >
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-md-4 control-label">
                            Email
                        </label>
                        <div class="col-md-8">
                            <input type="text" id="email" class="form-control" v-model="userName.email" >
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-3">
                <button class="btn btn-primary" @click="updateInfo">Update...</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import store from '../store'
    export default {
        name: 'Profile',
        data() {
            return {
                newName: '',
                errors: [],
                messages: []

            }
        },
        computed: {
            userName() {
                return store.getters.getUserData
            }
        },
        methods: {
            updateInfo() {
                let info = {name: this.userName.name, email: this.userName.email, id: this.userName.id}
                axios.put('http://localhost:8000/api/update', info)
                    .then(response => {
                        this.messages.push(response.data.message)
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
            },
        }
    }
</script>