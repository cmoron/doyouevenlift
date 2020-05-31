<template>
  <tr>
    <th>{{ group.repeat }}</th>
    <td>
      <p v-for="block in this.blocks" :key="block.id">
      {{ block.name }}
      </p>
    </td>
  </tr>
</template>
<script>
import Vue from 'vue'
import Axios from 'axios'

export default {
  name: 'Group',

  data: function() {
    return {
      blocks: []
    }
  },

  props: {
    group: Object
  },

  mounted() {
    Axios.get(Vue.prototype.$hostname + '/api/group/' + this.group._id + '/blocks').then(blockResponse => {
      this.blocks = blockResponse.data;
    }).catch (err => {
      console.error('Failed to load blocks from group id : ' + this.group._id, err);
    });
  }
}


</script>
