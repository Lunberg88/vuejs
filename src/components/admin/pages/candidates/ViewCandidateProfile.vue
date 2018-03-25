<template>
    <div class="row">
        <div class="col-md-12">
            <br>
            <ul class="list-group" v-for="(person, index, key) in candidateInfo" :key="key">
                <li class="list-group-item active"><h4><b>{{ person.fio }}</b></h4></li>
                <li class="list-group-item"><b>Email:</b> {{ person.email }}</li>
                <li class="list-group-item"><b>Stack:</b> {{ person.stack }}</li>
                <li class="list-group-item"><b>Skills:</b> {{ person.tags }}</li>
                <li class="list-group-item"><b>Salary:</b> {{ person.currency }}{{ person.salary }}</li>
                <li class="list-group-item"><b>Uploaded CV:</b> <small>{{ person.upload_cvs ? person.upload_cvs : 'not uploaded yet...' }}</small></li>
                <li class="list-group-item"><b>CV:</b> {{ person.cvs }}</li>
                <li class="list-group-item"><b>Status:</b> {{ person.status }}</li>
                <li class="list-group-item"><b>Created at:</b> {{ person.created_at }}</li>
            </ul>
            <br>
            <button @click="comeBack" class="btn btn-default">&leftarrow; back</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'ViewCandidateProfile',
    data() {
      return {
          candidateInfo: []
      }
    },
    methods: {
        comeBack() {
            this.$router.push('/admin/candidates');
        },
        fetchCandidateInfo() {
            const headers = {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            };
            axios.get('http://ajax_lv/api/candidate/' + this.$route.params.id, headers)
                .then(res => {
                    this.candidateInfo = res.data
                })
                .catch(e => {
                    console.log('Error fetching candidate profile: ' + e);
                })
        }
    },
    created() {
        this.fetchCandidateInfo()
    }
}
</script>
<style scoped>
    ul.list-group {
        width: 400px;
        text-align: left;
    }

    ul.list-group > li.list-group-item {
        border: 0;
    }
</style>