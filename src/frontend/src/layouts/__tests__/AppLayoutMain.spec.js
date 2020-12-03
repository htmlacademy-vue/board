import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AppLayoutMain from '@/layouts/AppLayoutMain';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';

let wrapper;
let push;
let dispatch;
let notifierSuccess;

const mocks = {
  $router: {},
  $route: {},
  $store: {
    dispatch: null,
    state: {
      Auth: {}
    }
  },
  $notifier: {}
};

const slots = {
  default: 'Test content'
};

beforeEach(() => {
  push = jest.fn();
  dispatch = jest.fn();
  notifierSuccess = jest.fn();
  mocks.$router.push = push;
  mocks.$store.dispatch = dispatch;
  mocks.$notifier.success = notifierSuccess;
});

afterEach(() => {
  mocks.$store.state.Auth = {};
});

describe('AppLayoutMain', () => {
  it('AppLayoutMain renders out', () => {
    wrapper = shallowMount(AppLayoutMain, {
      mocks,
      stubs: {
        AppNotifications: '<div>App Notifications</div>',
        RouterLink: RouterLinkStub
      }
    });

    expect(wrapper.html()).toBeTruthy();
  });

  it('AppLayoutMain doesn\'t render out header items', () => {
    wrapper = shallowMount(AppLayoutMain, {
      mocks,
      stubs: {
        AppNotifications: '<div>App Notifications</div>',
        RouterLink: RouterLinkStub
      }
    });

    expect(wrapper.html()).not.toContain('header__search');
  });

  it('AppLayoutMain renders out header items', () => {
    mocks.$store.state.Auth.isAuthenticated = true;

    wrapper = shallowMount(AppLayoutMain, {
      mocks,
      stubs: {
        AppNotifications: '<div>App Notifications</div>',
        RouterLink: RouterLinkStub
      }
    });

    const headerComponent = wrapper.find(AppLayoutHeader);
    expect(headerComponent.exists()).toBeTruthy();

    const sidebarComponent = wrapper.find(AppLayoutMainSidebar);
    expect(sidebarComponent.exists()).toBeTruthy();
  });

  it('AppLayoutMain renders out AppLayoutMainSidebar', () => {
    mocks.$store.state.Auth.isAuthenticated = true;

    wrapper = shallowMount(AppLayoutMain, {
      mocks,
      stubs: {
        AppNotifications: '<div>App Notifications</div>',
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.vm.$children
      .find(c => c.$options.name === 'AppLayoutMainSidebar'))
      .toBeTruthy();
  });

  it('AppLayoutMain doesn\'t render out AppLayoutMainSidebar', () => {
    wrapper = shallowMount(AppLayoutMain, {
      mocks,
      stubs: {
        AppNotifications: '<div>App Notifications</div>',
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.vm.$children
      .find(c => c.$options.name === 'AppLayoutMainSidebar'))
      .toBeFalsy();
  });

  it('AppLayoutMain doesn\'t render out the default slot content', () => {
    wrapper = shallowMount(AppLayoutMain, {
      mocks,
      slots,
      stubs: {
        AppNotifications: '<div>App Notifications</div>',
        RouterLink: RouterLinkStub
      }
    });
    expect(wrapper.html()).toContain(slots.default);
  });
});
