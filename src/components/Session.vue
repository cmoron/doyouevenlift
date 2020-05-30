<template>
    <div class="session">
        <h2 :class="{ even: session.even, odd: !session.even }" @click="toggleSession">{{ session.name }}</h2>
        <div class="wod_content" v-show="display">
                <block
                    v-for="block in blocks"
                    :block="block"
                    :key="block.id"
                ></block>
            <div class="structure">
                <h3>WOD</h3>
                <div class="structure_content">
                    <table>
                        <group
                            v-for="group in groups"
                            :group="group"
                            :key="group.id"
                        ></group>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import Axios from 'axios'
import Block from './Block.vue'
import Group from './Group.vue'

export default {
  name: 'Session',

  data: function() {
    return {
      groups: [],
      blocks: [],
      display: false
    }
  },

  props: {
    session: Object,
  },

  components: {
    Block,
    Group
  },

  methods: {
    toggleSession() {
      this.display = !this.display;
    }
  },

  mounted() {
    for (let sessionGroup of this.session.groups) {
      Axios.get(Vue.prototype.$hostname + '/api/group/' + sessionGroup).then(groupResponse => {
        this.groups.push(groupResponse.data);

        for (let sessionBlock of groupResponse.data.blocks) {
          Axios.get(Vue.prototype.$hostname + '/api/block/' + sessionBlock).then(blockResponse => {
            this.blocks.push(blockResponse.data);
          }).catch(err => {
            console.error("Failed to load block with id : " + sessionBlock, err);
          });
        }

      }).catch(err => {
        console.error("Failed to load group with id : " + sessionGroup, err);
      });
    }
  },
}
</script>
