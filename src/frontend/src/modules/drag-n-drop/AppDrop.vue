<template>
  <div
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AppDrop',
  methods: {
    onDrop(e) {
      const payload = e.dataTransfer.getData('payload');
      if (payload) {
        const transferData = JSON.parse(e.dataTransfer.getData('payload'));
        this.$emit('drop', transferData);
      }
    }
  }
};
</script>

<style scoped></style>
