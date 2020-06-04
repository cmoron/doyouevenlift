<template>
  <div class="session">
    <h2
      :class="{ even: session.even, odd: !session.even }"
      @click="toggleSession"
    >
      {{ session.name }}
    </h2>
    <div class="wod_content" v-show="display">
      <block v-for="block in blocks" :block="block" :key="block.id"></block>
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

  data: function () {
    return {
      groups: [],
      blocks: [],
      display: false
    }
  },

  props: {
    session: Object
  },

  components: {
    Block,
    Group
  },

  methods: {
    toggleSession () {
      this.display = !this.display
    }
  },

  mounted () {
    Axios.get(
      Vue.prototype.$hostname + '/api/session/' + this.session.id + '/blocks'
    )
      .then(blockResponse => {
        this.blocks = blockResponse.data
      })
      .catch(err => {
        console.error(
          'Failed to load blocks from session id : ' + this.session.id,
          err
        )
      })

    Axios.get(
      Vue.prototype.$hostname + '/api/session/' + this.session.id + '/groups'
    )
      .then(groupResponse => {
        this.groups = groupResponse.data
      })
      .catch(err => {
        console.error(
          'Failed to load groups from session id ' + this.session.id,
          err
        )
      })
  }
}
</script>
