export default {
    state: {
        access_token: null,
        expires_in: null,
        user_id: null
    },
    initialize() {
        this.state.access_token = localStorage.getItem('access_token')
        this.state.expires_in = parseInt(localStorage.getItem('expires_in'))
    },
    set(access_token, expires_in) {
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('expires_in', expires_in)
        this.initialize()
    },
    remove() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')
        this.initialize()
    }
}