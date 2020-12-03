import { createLocalVue, shallowMount } from '@vue/test-utils'
import DescColumn from '@/modules/columns/components/DeskColumn';
import AppIcon from '@/common/components/AppIcon';
import Vuex from 'vuex';
import { Auth, Tasks, Ticks } from '@/store/mocks';

let updateInput, showInput, store;

const localVue = createLocalVue();
localVue.use(Vuex);

const mocks = {
  updateInput: null,
  showInput: null
};

const propsData = {
  column: { id: 1, title: 'Column' }
};

beforeEach(() => {
  updateInput = jest.fn();
  showInput = jest.fn();
  mocks.updateInput = updateInput;
  mocks.showInput = showInput;
  store = new Vuex.Store({
    modules: {
      Tasks,
      Auth,
      Ticks
    }
  });
});

describe('DescColumn', () => {
  it('DescColumn doesn\'t render out input', () => {
    const wrapper = shallowMount(DescColumn, {
      propsData,
      localVue,
      stubs: {
        AppIcon
      },
      store
    });

    expect(wrapper.html()).not.toContain('input');
  });

  it('DescColumn emits update on input blur if title has been changed', () => {
    const wrapper = shallowMount(DescColumn, {
      propsData,
      localVue,
      stubs: {
        AppIcon
      },
      store
    });

    wrapper.vm.isInputShowed = true;
    const input = wrapper.find('input');
    input.element.value = 'test';
    input.trigger('input');
    input.trigger('blur');

    expect(wrapper.emitted().update[0][0]).toEqual({
      id: 1,
      title: 'test'
    });
  });
});
