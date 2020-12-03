import { shallowMount } from '@vue/test-utils';
import AppInput from '@/common/components/AppInput';

const propsData = {
  value: 'testValue',
  name: 'testName'
};

describe('AppInput', () => {
  it('AppInput sets the initial model value', () => {
    const wrapper = shallowMount(AppInput, {
      propsData
    });

    expect(wrapper.find('input').element.value).toBe(propsData.value);
  });

  it('AppInput emits an input event when typing', () => {
    const wrapper = shallowMount(AppInput, {
      propsData
    });

    let input = wrapper.find('input');
    input.trigger('input');
    expect(wrapper.emitted().input).toBeTruthy();
  });

  it('AppInput emits the current input value when typing', () => {
    const wrapper = shallowMount(AppInput, {
      propsData
    });

    let input = wrapper.find('input');
    input.element.value = 'test';
    input.trigger('input');
    expect(wrapper.emitted().input[0][0]).toEqual('test');
  });
});
