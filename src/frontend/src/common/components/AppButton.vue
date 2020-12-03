<template>
  <button
    class="button"
    :type="type"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      default: 'button'
    }
  }
};
</script>

<style lang="scss" scoped>
  .button {
    margin: 0;
    color: $white-900;
    text-align: center;
    padding: 17px 0;
    text-transform: uppercase;
    box-shadow: 0px 4px 8px $shadow-500;
    border: none;
    border-radius: 6px;
    display: block;
    width: 196px;
    box-sizing: border-box;
    cursor: pointer;
    @include m-s14-h21;
    transition: 0.3s;

    &--primary {
      background-color: $blue-600;

      &:hover:not(:active) {
        background-color: $blue-500;
        box-shadow: 0px 8px 16px $shadow-600;
      }

      &:active {
        background-color: $blue-700;
        box-shadow: 0px 4px 8px $shadow-500;
      }
    }

    &--error {
      background-color: $red-600;

      &:hover:not(:active) {
        background-color: $red-500;
        box-shadow: 0px 8px 16px $shadow-600;
      }

      &:active {
        background-color: $red-700;
        box-shadow: 0px 4px 8px $shadow-500;
      }
    }

    &--border {
      background-color: $white-900;
      color: $blue-gray-600;
      border: 1px solid $blue-gray-600;

      &:hover:not(:active) {
        background-color: $white-900;
      }

      &:active {
        background-color: $white-700;
      }
    }

    &--disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
