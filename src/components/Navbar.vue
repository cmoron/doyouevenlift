<template>
  <div>
    <router-link to='/'><h1>{{ title }}</h1></router-link>
    <p>
    <router-link to='/login'>Login</router-link> |
    <router-link to='/register'>Register</router-link>
    </p>
    <p>
      <input id='filter' v-model='filter' @input='emitEventFilterChange' type='text' name='filter' placeholder='Filter session name'>
    </p>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      title: 'Do you even lift ?',
      filter: ''
    }
  },
  methods: {
    emitEventFilterChange: function () {
      this.$emit('filterChange', this.filter)
    }
  }
}
</script>
<style>
</style>
