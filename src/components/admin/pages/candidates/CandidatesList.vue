<template>
    <div>
        <section>
            <h4>{{ title }}</h4>
        </section>
        <div class="row">
            <div class="col-md-12">
                <div class="table-container">
                    <div class="table-responsive">
                        <table class="table">
                            <thead class="text-primary">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Stack</th>
                                <th>Skills</th>
                                <th>Salary</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                <tr v-for="(person, index, key) in candidatesListInfo"
                                    :key="key"
                                    @click="viewLinkCandidateProfile(person.id)"
                                    class="candidates-list-tr"
                                    :style="person.viewed == 1 ? 'background: #fff' : 'background: #eee'"
                                >
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ person.fio }}</td>
                                    <td>{{ person.email }}</td>
                                    <td>{{ person.stack }}</td>
                                    <td>{{ person.tags }}</td>
                                    <td><b>{{ showCurr(person.currency) }}</b> {{ person.salary }}</td>
                                    <td class="td-actions">
                                        <button class="btn btn-warning btn-link">
                                            <i class="fa fa-eye" aria-hidden="true"></i>
                                        </button>
                                        <button class="btn btn-info btn-link">
                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                        </button>
                                        <button class="btn btn-danger btn-link">
                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <span class="isload" v-if="isLoad">
				    <i class="fa fa-refresh fa-spin"></i>
				    <h4>Connection...</h4>
			    </span>
            </div>
            <div class="col-md-12">
            </div>
        </div>
    </div>
</template>
<script>
import store from '../../../../store'
import axios from 'axios'

export default {
    name: 'CandidatesList',
    data() {
        return {
            title: 'Candidates list',
            isLoad: false
        }
    },
    computed: {
        candidatesListInfo() {
           return store.getters.getCandidatesListData
        }
    },
    methods: {
        fetchCandidatesList() {
            this.isLoad = true;
            const headers = { headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            };
            axios.get('http://ajax_lv/api/candidates', headers)
                .then(res => {
                    store.dispatch('setCandidatesData', {data: res.data})
                    this.isLoad = false;
                    console.log('candidates data load.');
                })
                .catch(e => {
                    this.isLoad = false;
                    console.log('error while fetching: ' + e);
                })
        },
        viewLinkCandidateProfile(id) {
            this.$router.push('/admin/candidates/profile/' + id);
        },
        showCurr(val) {
            if(val == '1') {
                return '$';
            } else if(val == '2') {
                return '€';
            } else if(val == '3') {
                return '₽';
            } else if(val == '4') {
                return '₴';
            }
        }
    },
    created() {
        this.fetchCandidatesList()
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

.candidates-list-tr:hover {
    cursor: pointer;
}

.table-container {
    padding: .9375rem 20px;
    position: relative;
    flex: 1 1 auto;
}

.table-responsive {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}

.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
}

.text-primary {
    color: #9c27b0!important;
}

.table thead tr th {
    font-size: 1.063rem;
}
.table>tbody>tr>td, .table>tbody>tr>th,
.table>tfoot>tr>td, .table>tfoot>tr>th,
.table>thead>tr>td, .table>thead>tr>th {
    padding: 12px 8px;
    vertical-align: middle;
    border-color: #ddd;
    font-size: .875rem;
}

.table>thead>tr>th {
    border-bottom-width: 1px;
    font-size: 1.0625rem;
    font-weight: 300;
}
.table thead th {
    font-size: .95rem;
    font-weight: 500;
    border-top-width: 0;
    border-bottom-width: 1px;
}
.table thead th {
    vertical-align: bottom;
    border-bottom: 2px solid rgba(0,0,0,.06);
}
.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid rgba(0,0,0,.06);
}

.table>tbody>tr {
    position: relative;
}

.table-container .table tr:first-child td {
    border-top: none;
}
.table>tbody>tr>td,
.table>tbody>tr>th,
.table>tfoot>tr>td,
.table>tfoot>tr>th,
.table>thead>tr>td,
.table>thead>tr>th {
    padding: 12px 8px;
    vertical-align: middle;
    border-color: #ddd;
    font-size: .875rem;
}

.table td, .table th {
    padding: .75rem;
    vertical-align: top;
    border-top: 1px solid rgba(0,0,0,.06);
}

.table .td-actions .btn {
    margin: 0;
    padding: 5px;
}

/********/
.table .td-actions .btn {
    margin: 0;
    padding: 0 6px;
}

.btn.btn-info.btn-link,
.btn.btn-info.btn-link:active,
.btn.btn-info.btn-link:focus,
.btn.btn-info.btn-link:hover {
    background-color: transparent;
    color: #00bcd4;
}
.btn.btn-info.btn-link {
    box-shadow: none;
}
.btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}

.btn.btn-info.btn-link,
.btn.btn-info.btn-link:active,
.btn.btn-info.btn-link:focus,
.btn.btn-info.btn-link:hover {
    background-color: transparent;
    color: #00bcd4;
}

.btn.btn-warning.btn-link,
.btn.btn-warning.btn-link:active,
.btn.btn-warning.btn-link:focus,
.btn.btn-warning.btn-link:hover {
    background-color: transparent;
    color: #ff9800;
}

.btn.btn-warning.btn-link,
.btn.btn-warning.btn-link:active,
.btn.btn-warning.btn-link:focus,
.btn.btn-warning.btn-link:hover {
    background-color: transparent;
    color: #ff9800;
}

.btn.btn-link:active,
.btn.btn-link:focus,
.btn.btn-link:hover {
    text-decoration: none!important;
}

.btn.btn-warning.btn-link {
    box-shadow: none;
}

.btn.btn-danger.btn-link,
.btn.btn-danger.btn-link:active,
.btn.btn-danger.btn-link:focus,
.btn.btn-danger.btn-link:hover {
    background-color: transparent;
    color: #f44336;
}

.btn.btn-danger.btn-link,
.btn.btn-danger.btn-link:active,
.btn.btn-danger.btn-link:focus,
.btn.btn-danger.btn-link:hover {
    background-color: transparent;
    color: #f44336;
}


</style>