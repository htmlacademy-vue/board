<template>
  <div class="modal">
    <div class="modal__box">
      <div class="modal__header">
        <div class="modal__logo">
          <img
            src="@/assets/img/logo.svg"
            alt="VueWork logo"
            width="135"
            height="21"
          />
        </div>
      </div>
      <div class="modal__content">
        <slot />
      </div>
      <div class="modal__action">
        <AppButton class="button--primary">
          Close
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueModal'
};
</script>

<style lang="scss" scoped>
.modal {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 50px;
  padding-top: 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &__box {
    position: relative;
    width: 500px;
    background-color: $white-900;
    box-shadow: 0 4px 8px $shadow-500;
  }

  &__header {
    padding: 20px;
  }

  &__content {
    padding: 40px;
  }

  &__action {
    display: flex;
    justify-content: flex-end;
    padding: 40px;
  }
}
</style>
