<template>
  <div
    v-if="notifications.length"
    class="notification__wrapper"
  >
    <div
      v-for="({ text, type }, i) in notifications"
      :key="i"
      :class="`notification notification--${type}`"
    >
      <span>{{ text }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Notifications',
  computed: {
    ...mapState(['notifications'])
  }
};
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  max-width: 100%;
  padding: 20px;
  border-bottom: 2px solid transparent;
  text-align: center;
  color: $white-900;
  box-sizing: border-box;
  &__wrapper {
    position: fixed;
    top: $header-height;
    right: 0;
    z-index: 9999;
    width: 420px;
    padding: 10px;
  }
  &--info {
    background: $blue-300;
    border-color: $blue-600;
  }
  &--error {
    background: $red-300;
    border-color: $red-600;
  }
  &--success {
    background: $green-300;
    border-color: $green-600;
  }
  &--warning {
    background: $orange-300;
    border-color: $orange-600;
  }
}
</style>
