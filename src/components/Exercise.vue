<template>
  <li class="ex_li">
    <span class="exercise">
      <span class="ex_repeat">{{ this.exercise.repeat }}</span>
      <span class="ex_name">{{ this.exercise.name }}</span>
    </span>
  </li>
</template>

<script>
export default {
  props: {
    exercise: Object
  },
}
</script>
