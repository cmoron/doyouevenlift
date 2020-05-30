<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <Session
      v-for="session in sessions"
      :session="session"
      :key="session.id"
    ></Session>
  </div>
</template>

<script>
import Axios from 'axios'
import Session from './components/Session.vue'

export default {
  name: 'App',
  data: function() {
    return {
      title: 'Do you even lift ?',
      sessions: []
    }
  },
  components: {
    Session
  },

  mounted() {

    Axios.get('http://localhost:3000/api/sessions').then(sessionResponse => {
      let index = 0;
      for(let sessionData of sessionResponse.data) {
        this.sessions.push({
          id: sessionData._id,
          name: sessionData.name,
          groups: sessionData.groups,
          even: index % 2 == 0
        });
        ++index
      }
    })
  }
}
</script>
