import { shallowMount } from '@vue/test-utils';
import AppButton from '@/common/components/AppButton';

const defaultSlot = 'content';
const propsData = {
  type: 'submit'
};

describe('AppButton', () => {
  it('AppButton renders out the slot content', () => {
    const wrapper = shallowMount(AppButton, {
      slots: {
        default: defaultSlot
      }
    });

    expect(wrapper.html()).toContain(defaultSlot);
  });

  it('AppButton raises the click event on click', () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(AppButton, {
      listeners: { click: onClick }
    });
    wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('AppButton button type is button', () => {
    const wrapper = shallowMount(AppButton);
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('AppButton button type is submit', () => {
    const wrapper = shallowMount(AppButton, {
      propsData
    });
    expect(wrapper.attributes('type')).toBe('submit');
  });
});
