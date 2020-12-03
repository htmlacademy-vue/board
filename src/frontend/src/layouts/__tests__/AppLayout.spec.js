import { shallowMount } from '@vue/test-utils';
import AppLayout from '@/layouts/AppLayout';
import AppNotifications from '@/common/components/AppNotifications';

let wrapper;
const mocks = {
  $store: {
    state: {
      notifications: []
    }
  },
  $route: {
    meta: {
      layout: ''
    }
  }
};
const stubs = {
  AppNotifications
};

beforeEach(() => {
  wrapper = shallowMount(AppLayout, {
    stubs,
    mocks
  });
});

describe('AppLayout', () => {
  it('AppLayout renders the AppLayoutDefault', () => {
    expect(wrapper.vm.$children[0].$options.name)
      .toBe('AppLayoutDefault');
  });
});
