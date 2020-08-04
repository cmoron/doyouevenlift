<template>
  <div class="login">
    <form @submit.prevent="loginUser">
    <input id="username" name="username" type="text" placeholder="Username" v-model="username"><br/>
    <input id="password" name="password" type="password" placeholder="Password" v-model="password"><br/>
    <input type="submit" value="Login"><br/>
    </form>
    <div class="error_message">{{ error }}</div>
    <router-link to="/register">Create new account</router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
  data: function () {
    return {
      username: '',
      password: '',
      result: ''
    }
  },
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions(['login']),
    loginUser: function () {
      const user = {
        username: this.username,
        password: this.password
      }

      this.login(user)
        .then(res => {
          if (res.data.success) {
            this.$router.push('/profile')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
