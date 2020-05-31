<template>
  <div>
    <h3>{{ block.name }}</h3>

    <ul class="ex_ul">
      <li class="ex_li" v-for="exercise of this.exercises" :key="exercise.id">
        <Exercise
          :exercise="exercise"
          :key="exercise.id"
          ></Exercise>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import Exercise from './Exercise.vue';

export default {
  name: 'Block',

  data: function() {
    return {
      exercises: []
    }
  },

  props: {
    block: Object
  },

  components: {
    Exercise
  },

  mounted() {
    Axios.get(Vue.prototype.$hostname + '/api/block/' + this.block._id + '/exercises').then(exerciseResponse => {
      this.exercises = exerciseResponse.data;
    }).catch(err => {
      console.error('Failed to load exercises from block with id ' + this.block._id, err);
    });
  }
}
</script>
