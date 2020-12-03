import { shallowMount } from '@vue/test-utils';
import $validator from '@/common/mixins/validator';
import Login from '@/views/Login';
import AppButton from '@/common/components/AppButton';
import AppInput from '@/common/components/AppInput';

const push = jest.fn();
const dispatch = jest.fn();
const login = jest.fn();

const methods = {
  login
};

const mocks = {
  $router: {
    push
  },
  $store: {
    dispatch
  },
  $validator
};

const stubs = {
  AppInput,
  AppButton
};

describe('Login', () => {
  it('Login login method has been called', () => {
    const wrapper = shallowMount(Login, {
      methods,
      mocks,
      stubs
    });

    wrapper.find('form').trigger('submit');
    expect(login).toHaveBeenCalled();
  });

  it('Login validation has been called in login method', () => {
    const wrapper = shallowMount(Login, {
      mocks,
      stubs
    });

    const spyValidateFields = jest.spyOn(wrapper.vm, '$validateFields');
    wrapper.find('form').trigger('submit');
    expect(spyValidateFields).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('Login dispatch and push if credentials are valid', async () => {
    const wrapper = shallowMount(Login, {
      mocks,
      stubs
    });

    wrapper.vm.email = 'test@gmail.com';
    wrapper.vm.password = '123456';

    wrapper.find('form').trigger('submit');
    expect(dispatch).toHaveBeenCalled();
    await wrapper.vm.$nextTick();
    expect(push).toHaveBeenCalledWith('/');
  });
});
