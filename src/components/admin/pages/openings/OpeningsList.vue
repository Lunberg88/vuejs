<template>
    <div class="row">
        <div class="col-md-12">
            Opening list...
        </div>
        <div class="col-md-12">
            <div class="row">
                <div class="card col-md-4" v-if="openingsList" v-for="(item, index, key) in openingsList" :key="key">
                    <img :src="host + item.img" class="card-img-top" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <p class="card-text"><small class="text-muted">{{ item.location }}</small></p>
                    </div>
                </div>
                <span class="isload" v-if="isLoad">
				    <i class="fa fa-refresh fa-spin"></i>
				<h4>Connection...</h4>
			</span>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../../../store'
import axios from 'axios'
export default {
    name: 'OpeningsList',
    data() {
        return {
            openingsList: [],
            host: 'http://ajax_lv/images/openings/',
            isLoad: false
        }
    },
    methods: {
        fetchOpeningsList() {
            this.isLoad = true;
            const headers = { headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }};
            axios.get('http://ajax_lv/api/openings', headers)
                .then(res => {
                    this.openingsList = res.data
                    this.isLoad = false;
                    console.log('openings loaded!');
                })
                .catch(e => {
                    this.isLoad = false;
                    console.log('Error while fetching: ' + e);
                })
        }
    },
    created() {
        this.fetchOpeningsList()
    }
}
</script>
<style scoped>
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