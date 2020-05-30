<template>
  <div>
    <h3>{{ block.name }}</h3>

    <ul class="ex_ul">
      <li class="ex_li" v-for="exercise of this.exercises">
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
    for (let blockExercise of this.block.exercises) {
      Axios.get(Vue.prototype.$hostname + '/api/exercise/' + blockExercise).then(exerciseResponse => {
        this.exercises.push(exerciseResponse.data);
      }).catch(err => {
        console.error("Failed to load exercise with id: " + blockExercise, err);
      });
    }
  }
}
</script>
