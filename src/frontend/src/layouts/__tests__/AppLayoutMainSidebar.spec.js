import { createLocalVue, shallowMount } from '@vue/test-utils';
import AppLayoutMainSidebar from '@/layouts/AppLayoutMainSidebar';
import Vuex from 'vuex';
import { Auth, Tasks, Ticks } from '@/store/mocks';

let store;

beforeEach(() => {
  store = new Vuex.Store({
    modules: {
      Tasks,
      Auth,
      Ticks
    }
  });
});

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppLayoutMainSidebar', () => {
  it('AppLayoutMainSidebar renders out', () => {
    const wrapper = shallowMount(AppLayoutMainSidebar, {
      localVue,
      store
    });

    expect(wrapper.html()).toBeTruthy();
  });
});
