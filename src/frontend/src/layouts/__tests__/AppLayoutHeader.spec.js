import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AppLayoutHeader from '@/layouts/AppLayoutHeader';
import { Tasks, Auth } from '@/store/mocks';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

let wrapper;

describe('AppLayoutHeader', () => {

  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        Tasks,
        Auth
      }
    });
  });

  it('AppLayoutHeader renders out', () => {
    wrapper = shallowMount(AppLayoutHeader, {
      router,
      store,
      localVue
    });

    expect(wrapper.html()).toBeTruthy();
    expect(wrapper.find('.header')).toBeTruthy();
  });

  it('AppLayoutHeader test router link to home', () => {
    wrapper = shallowMount(AppLayoutHeader, {
      router,
      store,
      localVue
    });

    const logo = wrapper.find('.header__logo');
    expect(logo).toBeTruthy();
    logo.trigger('click');
    expect(wrapper.vm.$route.path).toBe('/');
  });

  it('AppLayoutHeader test menu', () => {
    wrapper = shallowMount(AppLayoutHeader, {
      directives: {
        'click-outside'() {}
      },
      router,
      store,
      localVue
    });

    const menu = wrapper.find('.header__user');
    expect(menu).toBeTruthy();
    menu.trigger('click');
    expect(wrapper.vm.isMenuOpened).toBeTruthy();

    const userMenu = wrapper.find('.user-menu');
    expect(userMenu).toBeTruthy();

    const image = wrapper.find('.user-menu > img');
    expect(image).toBeTruthy();
    expect(image.attributes().width).toBe('56');
    expect(image.attributes().height).toBe('56');
    expect(image.attributes().alt).toBe('Ваш аватар');

    const link = wrapper.find('.user-menu > a');
    expect(link).toBeTruthy();
  });

  it('AppLayoutHeader test router link to task creating', () => {
    wrapper = shallowMount(AppLayoutHeader, {
      router,
      store,
      localVue
    });

    store.commit('Auth/setUser', { isAdmin: true });

    const button = wrapper.find('.header__create-task');
    expect(button).toBeTruthy();
    button.trigger('click');
    expect(button.props('to')).toBe('/tasks/create');
  });
});
