<template>
    <div class="card">
        <h3>Profile</h3>
        <p>{{ username }}</p>
    </div>
</template>
<script>
    export default {
        computed: {
            username() {
                return this.$route.params.username
            }
        }
    }
</script>