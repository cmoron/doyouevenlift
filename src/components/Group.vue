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
    for (let groupBlock of this.group.blocks) {
      Axios.get(Vue.prototype.$hostname + '/api/block/' + groupBlock).then(blockResponse => {
        this.blocks.push(blockResponse.data);
      }).catch(err => {
        console.error("Failed to load block with id : " + groupBlock, err);
      });
    }
  },
}


</script>
