<template>
  <div class="register">
    <form @submit.prevent="registerUser">
    <input id="username" type="text" placeholder="Username" v-model="username"><br/>
    <input id="name" type="text" placeholder="Name" v-model="name"><br/>
    <input id="email" type="text" placeholder="Email" v-model="email"><br/>
    <input id="password" type="password" placeholder="Password" v-model="password"><br/>
    <input id="confirm_password" type="password" placeholder="Confirm Password" v-model="confirm_password"><br/>
    <input type="submit" value="Register account"><br/>
    </form>
    <div class="error_message">{{ error }}</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'register',
  data: function () {
    return {
      username: '',
      name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  },
  computed: {
    ...mapGetters(['error'])
  },
  methods: {
    ...mapActions(['register']),
    registerUser () {
      const user = {
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
        email: this.email,
        name: this.name
      }
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push('login')
        }
      })
    }
  }
}
</script>
