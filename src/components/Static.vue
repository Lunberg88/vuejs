<template>

    <div class="row">
      <div class="col-md-offset-2 col-md-8">
        <h3>Static page</h3>
          <div class="panel panel-default">
              <div class="panel-title">
                  <span v-if="getInfo">[{{ getInfo }}] / {{ getUser }}</span>
                  <span class="label label-danger">
                      {{ user != null ? 'true' : 'false' }}
                  </span>
                  <div class="label label-default" v-if="user">
                      {{ user.id }} |
                      {{ user.name }} |
                      {{ user.email }} |
                      {{ user.admin }} |
                      {{ user.created_at }} |
                      {{ user.updated_at }}
                  </div>
              </div>
          </div>
      </div>
    </div>

</template>
<script>
import store from '../store'

export default {
    name: 'Static',
    computed: {
        user() {
            return store.state.userData
        },
        getInfo() {
            return store.getters.getInfo
        }
    }
}
</script>
