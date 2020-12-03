import { shallowMount } from '@vue/test-utils';
import AppIcon from '@/common/components/AppIcon';

describe('AppIcon', () => {
  it('AppIcon raises the click event on click', () => {
    const onClick = jest.fn();
    const wrapper = shallowMount(AppIcon, {
      listeners: { click: onClick }
    });
    wrapper.find('button').trigger('click');
    expect(onClick).toHaveBeenCalled();
  });
});
