import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    //plugins: [createPersistedState()],

    state: {
        counter: 1,
        access_token: localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null,
        expires_in: localStorage.getItem('expires_in') ? localStorage.getItem('expires_in') : null,
        tokensData: null,
        user: localStorage.getItem('vue_user_data') ? JSON.parse(localStorage.getItem('vue_user_data')) : 0,
        candidatesListData: [],
        openingsListData: [],
        userData: []
    },
    remove() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_in')
        this.initialize()
    },

    getters: {
        getToken: state => {
          return state.access_token;
        },
        getUser: state => {
            return state.user;
        },
        getInfo: state => {
            return state.info;
        },
        getCandidatesListData: state => {
            return state.candidatesListData;
        },
        getOpeningsListData: state => {
            return state.openingsListData;
        },
        getUserData: state => {
            return state.userData;
        },
        getTokenExpiresIn: state => {
            return state.expires_in;
        }
    },
    mutations: {
        setTokensData(state, payload) {
            state.tokensData = payload.info
        },
        setToken(state, payload) {
            localStorage.setItem('access_token', payload.access_token)
            localStorage.setItem('expires_in', payload.expires_in)
            state.access_token = localStorage.getItem('access_token')
            state.expires_in = parseInt(localStorage.getItem('expires_in'))
        },
        /*
        setUserData(state, payload) {
            localStorage.setItem('vue_user_data', JSON.stringify(payload.data))
            state.user = JSON.parse(localStorage.getItem('vue_user_data'))
        },
        */
        setUserData(state, payload) {
            state.userData = payload.data
        },
        removeUserData(state) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_in');
            localStorage.removeItem('vue_user_data');
            localStorage.removeItem('vuex');
            state.userData = [];
            state.access_token = null;
            state.expires_in = null;
            state.user = null;
        },
        setCandidatesListData(state, payload) {
          state.candidatesListData = payload.data
        },
        updateCandidatesListData(state, payload) {
          state.candidatesListData = payload.data
        },
        updateUserData(state, payload) {
           // todo...
        },
        fetchData(state, payload) {
            state.info = payload.data
        }
    },
    actions: {
        setUser({commit}, data) {
            commit('fetchData', data)
        },
        setCandidatesData({commit}, data) {
            commit('setCandidatesListData', data)
        },
        updateCandidatesData({commit}, data) {
            commit('updateCandidatesListData', data)
        },
        setUserDataInfo({commit}, data) {
            commit('setUserData', data)
        },
        async setTest({commit}) {
            let headers = {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
            };
            await axios.get('http://ajax_lv/api/user', headers)
                .then(response => {
                    commit('setUserData', {data: response.data})
                })
                .catch(e => {
                    console.log('This is error: ' + e.response)
                })
        }
    }

})

export default store