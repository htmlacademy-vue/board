<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'AppDrag',
  props: {
    transferData: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState('Auth', ['user']),
    draggable() {
      if (!this.user) {
        return false;
      }
      const { isAdmin, id: userId } = this.user;
      return isAdmin || userId === this.transferData.userId;
    }
  },
  methods: {
    onDrag(e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.setData('payload', JSON.stringify(this.transferData));
    }
  }
};
</script>
