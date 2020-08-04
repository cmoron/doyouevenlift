<template>
  <div>
    <router-link to='/'><h1>{{ title }}</h1></router-link>
    <p>
    <span class="nav_elem"><router-link to='/'>home</router-link></span>
    <span class="nav_elem" v-if="!isLoggedIn"><router-link to='/login' v-if="!isLoggedIn">login</router-link></span>
    <span class="nav_elem" v-if="!isLoggedIn"><router-link to='/register' v-if="!isLoggedIn">register</router-link></span>
    <span class="nav_elem" v-if="isLoggedIn"><router-link to='/profile' v-if="isLoggedIn">profile</router-link></span>
    <span class="nav_elem" v-if="isLoggedIn && user">
    Logged as {{ user.username }} [ <a to="/logout" href="/login" @click.prevent="logoutUser">logout</a> ]
    </span>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    logoutUser () {
      this.logout()
    }
  },
  data: function () {
    return {
      title: 'Do you even lift ?'
    }
  }
}
</script>
