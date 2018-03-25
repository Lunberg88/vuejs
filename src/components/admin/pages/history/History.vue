<template>
    <div class="row">
        <div class="col-md-12">
            History content...
            <div class="form-group">
                <input v-model="search" name="search" type="search" class="form-control" placeholder="Search...">
            </div>
        </div>
        <div class="col-md-12">
            <table class="table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Actions</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="historyList" v-for="(item, index, key) in onSearch" :key="key">
                        <td>
                            <span :class="checkType(item.type)">
                                {{ checkBadge(item.type) }}
                            </span>
                        </td>
                        <td>{{ validHtml(item.actions) }}</td>
                        <td>{{ item.created_at }}</td>
                    </tr>
                </tbody>
            </table>
            <span class="isload" v-if="isLoad">
                <i class="fa fa-refresh fa-spin"></i>
                <h4>Connection...</h4>
            </span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'History',
    data() {
        return {
            search: '',
            historyList: [],
            isLoad: false
        }
    },
    computed: {
      onSearch() {
          return this.historyList.filter(log => {
                 return log.actions.toLowerCase().includes(this.search.toLowerCase())
          });
      }
    },
    methods: {
        getHistoryList() {
            this.isLoad = true
            const headers = { headers: {
               'Accept': 'application/json',
               'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }};
            axios.get('http://ajax_lv/api/history', headers)
                .then(res => {
                    this.historyList = res.data
                    this.isLoad = false
                })
                .catch(e => {
                    this.isLoad = false
                    console.log('Error while fetching...' + e);
                })
        },
        checkType(val) {
            switch(val) {
                case 1:
                    return 'badge badge-success';
                case 2:
                    return 'badge badge-info';
                case 3:
                    return 'badge badge-danger';
                default:
                    return 'badge badge-default';
            }
        },
        checkBadge(val) {
            switch(val) {
                case 1:
                    return 'created';
                case 2:
                    return 'updated';
                case 3:
                    return 'deleted';
                default:
                    return 'system';
            }
        },
        validHtml(str) {
            let text = str;
            return text;
        }
    },
    created() {
        this.getHistoryList()
    }
}

</script>

<style scoped>
.isload {
    display: block;
    top: 25%;
    left: 0;
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

input[type=search] {
    width: 30%;
}

input[type=search]:before {
    content: "\f002";
    display: inline-block;
    position: relative;
    width: 15px;
    height: 10px;
    font: normal normal normal 14px/1 FontAwesome;
}
</style>