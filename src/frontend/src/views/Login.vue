<template>
  <div class="sign-form sign-in">
    <div class="sign-form__header">
      <a
        href=""
        class="logo"
      >
        <img
          src="../assets/img/logo.svg"
          alt="VueWork logo"
          width="147"
          height="23"
        />
      </a>

      <button
        class="sign-form__close"
        type="button"
        @click="$router.push('/')"
      />
    </div>

    <h3 class="sign-form__title">
      Войти
    </h3>

    <form
      class="sign-form__shape"
      @submit.prevent="login"
    >
      <label class="sign-form__input">
        <AppInput
          v-model="email"
          type="email"
          name="email"
          class="input"
          placeholder="E-mail"
          :error-text="validations.email.error"
        />
      </label>
      <label class="sign-form__input">
        <AppInput
          v-model="password"
          type="password"
          name="password"
          class="input"
          placeholder="Пароль"
          :error-text="validations.password.error"
        />
      </label>

      <div class="sign-form__wrap">
        <AppButton
          class="button--primary"
          type="submit"
        >
          Войти
        </AppButton>
      </div>
    </form>
  </div>
</template>

<script>
import validator from '@/common/mixins/validator';
import middlewares from '@/middlewares';

export default {
  name: 'Login',
  middlewares: { isLoggedIn: middlewares.IS_LOGGED_IN },
  mixins: [validator],
  data: () => ({
    email: '',
    password: '',
    validations: {
      email: {
        error: '',
        rules: ['required', 'email']
      },
      password: {
        error: '',
        rules: ['required']
      }
    }
  }),
  watch: {
    email() {
      this.$clearValidationErrors();
    },
    password() {
      this.$clearValidationErrors();
    }
  },
  methods: {
    async login() {
      if (!this.$validateFields(
        { email: this.email, password: this.password },
        this.validations
      )) {
        return;
      }
      await this.$store.dispatch('Auth/login', {
        email: this.email,
        password: this.password
      });
      await this.$router.push('/');
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-form {
  @include pf_center-all;
  display: block;
  width: 500px;
  background-color: $white-900;
  box-shadow: 0 4px 8px $shadow-500;

  &__shape {
    padding-right: 64px;
    padding-bottom: 64px;
    padding-left: 64px;
  }

  &__header {
    padding: 25px;
    display: flex;
    justify-content: space-between;
    background-color: $blue-600;
  }

  &__title {
    @include m-s24-h21;
    margin: 30px 0;
    text-align: center;
    color: $blue-gray-600;
  }

  &__input {
    display: block;
    margin-bottom: 16px;
  }

  &__checkbox {
    margin-top: 20px;
  }

  &__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
  }

  &__link {
    color: $blue-600;

    &:hover {
      text-decoration: underline;
    }
  }

  &__close {
    position: relative;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &::after,
    &::before {
      content: "";
      width: 100%;
      height: 1px;
      background-color: $white-900;
      position: absolute;
      left: 50%;
      top: 50%;
      transition: background-color 0.3s;
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &:hover {
      &::before,
      &::after {
        opacity: 0.6;
      }
    }
  }
}
</style>
