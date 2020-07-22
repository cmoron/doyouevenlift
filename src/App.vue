<template>
  <div id='app'>
    <Navbar
      @filterChange="updateFilter">
    </Navbar>
    <Session
      v-for='session in filteredSessions'
      :session='session'
      :key='session.id'
    ></Session>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import Session from '@/components/Session'
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  data: function () {
    return {
      sessions: [],
      filter: '',
      filteredSessions: []
    }
  },
  watch: {
    filter: function (val) {
      this.filteredSessions = this.sessions.filter(session => {
        return session.name.toLowerCase().includes(val.toLowerCase())
      })
    }
  },
  methods: {
    updateFilter: function (data) {
      this.filter = data
    }
  },
  components: {
    Session,
    Navbar
  },
  mounted () {
    Axios.get(Vue.prototype.$hostname + '/api/sessions').then(sessionResponse => {
      let index = 0

      for (const sessionData of sessionResponse.data) {
        this.sessions.push({
          id: sessionData._id,
          name: sessionData.name,
          groups: sessionData.groups,
          even: index % 2 === 0
        })
        ++index
      }

      this.filteredSessions = this.sessions
    }).catch(error => {
      console.error('Error while retrieving sessions', error)
    })
  }
}
</script>
