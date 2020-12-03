import { shallowMount } from '@vue/test-utils';
import AppNotifications from '@/common/components/AppNotifications';
import AppButton from '@/common/components/AppButton';

const mocks = {
  $store: {
    state: {
      notifications: []
    }
  }
};

const stubs = {
  AppButton
};

afterEach(() => {
  mocks.$store.state.notifications = [];
});

describe('AppNotifications', () => {
  it('AppNotifications doesn\'t render out when no notifications', () => {
    const wrapper = shallowMount(AppNotifications, {
      mocks
    });

    expect(wrapper.html()).toBeFalsy();
  });

  it('AppNotifications renders out when we have notifications', () => {
    mocks.$store.state.notifications = [
      { text: 'text', type: 'warning' }
    ];
    const wrapper = shallowMount(AppNotifications, {
      mocks
    });

    expect(wrapper.html()).toBeTruthy();
  });

  it('AppNotifications renders out notification', () => {
    mocks.$store.state.notifications = [
      { text: 'text', type: 'warning' }
    ];
    const wrapper = shallowMount(AppNotifications, {
      stubs,
      mocks
    });

    expect(wrapper.html()).toContain('notification--warning');
    expect(wrapper.html()).toContain('text');
  });
});
