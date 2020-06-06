<template>
  <div id="app">
    <Navbar />
    <Session
      v-for="session in sessions"
      :session="session"
      :key="session.id"
    ></Session>
  </div>
</template>

<script>
import Axios from "axios";
import Session from "@/components/Session";
import Navbar from "@/components/Navbar";

export default {
  name: "App",
  data: function() {
    return {
      sessions: []
    };
  },
  components: {
    Session,
    Navbar
  },

  mounted() {
    Axios.get("http://localhost:3000/api/sessions").then(sessionResponse => {
      let index = 0;
      for (let sessionData of sessionResponse.data) {
        this.sessions.push({
          id: sessionData._id,
          name: sessionData.name,
          groups: sessionData.groups,
          even: index % 2 == 0
        });
        ++index;
      }
    });
  }
};
</script>
