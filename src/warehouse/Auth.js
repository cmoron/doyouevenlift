import Axios from 'axios'
import Vue from 'vue'
import router from '../router.js'

const state = {
  token: localStorage.getItem('token') || '',
  user: {},
  status: '',
  error: null,
  test: ''
}

const getters = {
  isLoggedIn: state => !!state.token,
  authState: state => state.status,
  user: state => state.user,
  error: state => state.error
}

const actions = {
  // Login Action
  async login ({
    commit
  }, user) {
    commit('auth_request')
    try {
      const res = await Axios.post(Vue.prototype.$hostname + '/api/user/login', user)
      if (res.data.success) {
        const token = res.data.token
        const user = res.data.user

        // Store the token into the localstorage
        localStorage.setItem('token', token)

        // Set the Axios defaults
        Axios.defaults.headers.common.Authorization = token
        commit('auth_success', token, user)
      }
      return res
    } catch (err) {
      commit('auth_error', err)
    }
  },
  // Register User
  async register ({
    commit
  }, userData) {
    try {
      commit('register_request')
      const res = await Axios.post(Vue.prototype.$hostname + '/api/user', userData)
      if (res.data.success !== undefined) {
        commit('register_success')
      }
      return res
    } catch (err) {
      commit('register_error', err)
    }
  },
  // Get the user Profile
  async getProfile ({
    commit
  }) {
    commit('profile_request')
    const res = await Axios.get(Vue.prototype.$hostname + '/api/user/profile')
    commit('user_profile', res.data.user)
    return res
  },
  // Logout the user
  async logout ({
    commit
  }) {
    await localStorage.removeItem('token')
    commit('logout')
    delete Axios.defaults.headers.common.Authorization
    router.push('/login')
  }
}

const mutations = {
  auth_request (state) {
    state.error = null
    state.status = 'loading'
  },
  auth_success (state, token, user) {
    state.token = token
    state.user = user
    state.status = 'success'
    state.error = null
  },
  auth_error (state, err) {
    console.log(err)
    state.error = err.response.data.message
  },
  register_request (state) {
    state.error = null
    state.status = 'loading'
  },
  register_success (state) {
    state.error = null
    state.status = 'success'
  },
  register_error (state, err) {
    console.log(err)
    state.error = err.response.data.message
  },
  logout (state) {
    state.error = null
    state.status = ''
    state.token = ''
    state.user = ''
  },
  profile_request (state) {
    state.status = 'loading'
  },
  user_profile (state, user) {
    state.user = user
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
