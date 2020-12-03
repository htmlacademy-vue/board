import { shallowMount, createLocalVue } from '@vue/test-utils';
import TaskCardDetail from '@/modules/tasks/components/TaskCardCreator';
import AppButton from '@/common/components/AppButton';
import TaskCardDetailWorkerSelector
  from '@/modules/tasks/components/TaskCardCreatorUserSelector';
import TaskCardDetailDueDateSelector
  from '@/modules/tasks/components/TaskCardCreatorDueDateSelector';
import TaskCardDetailTicksList
  from '@/modules/tasks/components/TaskCardViewTicksList';
import TaskCardDetailsTags
  from '@/modules/tasks/components/TaskCardCreatorTags';
import { Tasks, Ticks } from '@/store/mocks';
import Vuex from 'vuex';

let wrapper, store;

const localVue = createLocalVue();
localVue.component('AppButton', AppButton);
localVue.use(Vuex);

const task = {
  id: 1,
  user: {
    name: 'User'
  },
  status: 'red',
  timeStatus: 'time',
  title: 'Task Title',
  description: 'Task description',
  url: 'task_url',
  urlDescription: 'task url description',
  tags: '#tag1 #tag2'
};

const mocks = {
  $router: {},
  $route: {
    params: { id: 1 }
  },
  $validator: () => {},
  $notifier: {
    warning: () => {}
  },
  updateTick: null
};

wrapper = shallowMount(TaskCardDetail, {
  mocks,
  localVue,
  data: () => ({ task })
});

beforeEach(() => {
  mocks.updateTick = jest.fn();
  store = new Vuex.Store({
    modules: {
      Tasks,
      Ticks
    }
  });
});

describe('TaskCard', () => {
  it('TaskCardDetails contains renders correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true);
    expect(wrapper.contains('.task-card')).toBeTruthy();

    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(3);

    expect(wrapper.find(TaskCardDetailWorkerSelector).exists()).toBeTruthy();
    expect(wrapper.find(TaskCardDetailDueDateSelector).exists()).toBeTruthy();

    const description = wrapper.find('.task-card__description');
    expect(description).toBeTruthy();

    const links = wrapper.find('.task-card__links');
    expect(links).toBeTruthy();

    expect(wrapper.find(TaskCardDetailTicksList).exists()).toBeTruthy();
    expect(wrapper.find(TaskCardDetailsTags).exists()).toBeTruthy();
  });

  it('TaskCardDetails test inputs', () => {
    const inputs = wrapper.findAll('input');
    expect(inputs.at(0).element.value).toBe(task.title);
    expect(inputs.at(1).element.value).toBe(task.url);
    expect(inputs.at(2).element.value).toBe(task.urlDescription);
  });

  it('TaskCardDetails test TaskCardDetailTicksList', async () => {
    wrapper = shallowMount(TaskCardDetail, {
      mocks,
      localVue,
      store,
      data: () => ({ task })
    });
    const ticksList = wrapper.find(TaskCardDetailTicksList);
    ticksList.vm.$emit('createTick');
    ticksList.vm.$emit('updateTick', { id: 1 });
    ticksList.vm.$emit('removeTick', { id: 1 });

    await wrapper.vm.$nextTick();

    expect(ticksList.emitted().createTick).toBeTruthy();
    expect(ticksList.emitted().updateTick).toBeTruthy();
    expect(ticksList.emitted().removeTick).toBeTruthy();
  });

  it('TaskCardDetails test buttons', async () => {

    const buttons = wrapper.findAll(AppButton);
    const cancelButton = buttons.at(0);
    const submitButton = buttons.at(1);

    expect(cancelButton.exists()).toBeTruthy();
    expect(submitButton.exists()).toBeTruthy();
  });
});
