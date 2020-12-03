import { shallowMount } from '@vue/test-utils';
import AppLayoutDefault from '@/layouts/AppLayoutDefault';

const defaultSlot = 'content';

describe('AppLayoutDefault', () => {
  it('AppLayoutDefault renders out the slot content', () => {
    const wrapper = shallowMount(AppLayoutDefault, {
      stubs: {
        AppNotifications: '<div>App Notifications</div>'
      },
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.html()).toContain(defaultSlot);
  });
});
