import { shallowMount } from '@vue/test-utils';
import TaskCard from '@/modules/tasks/components/TaskCard';

const task = {
  id: 1,
  user: {
    name: 'User'
  },
  status: 'red',
  timeStatus: 'time',
  title: 'Task Title',
  tags: '#tag1 #tag2'
};

const mocks = {
  $store: {
    dispatch: null
  }
};

describe('TaskCard', () => {
  it('TaskCard renders out the task title', () => {
    const wrapper = shallowMount(TaskCard, {
      propsData: {
        task
      }
    });
    expect(wrapper.html()).toContain(task.title);
  });

  it('TaskCard renders out the user avatar if user exists', () => {
    const wrapper = shallowMount(TaskCard, {
      propsData: {
        task
      }
    });
    expect(wrapper.html()).toContain('Аватар пользователя');
  });

  it('TaskCard doesn\'t render out the user avatar if there is no user', () => {
    const wrapper = shallowMount(TaskCard, {
      propsData: {
        task: { ...task, user: null }
      }
    });
    expect(wrapper.html()).not.toContain('Аватар пользователя');
  });

  it('TaskCard renders out the status if it exists', () => {
    const wrapper = shallowMount(TaskCard, {
      propsData: {
        task
      }
    });
    expect(wrapper.html()).toContain('task__status--red');
  });

  it('TaskCard renders out the timeStatus if it exists', () => {
    const wrapper = shallowMount(TaskCard, {
      propsData: {
        task
      }
    });
    expect(wrapper.html()).toContain('task__status--time');
  });

  it('TaskCard renders out tags if those exist', () => {
    const wrapper = shallowMount(TaskCard, {
      mocks,
      propsData: {
        task
      }
    });
    expect(wrapper.html()).toContain('task__user');
  });

  it('TaskCard emits task id on click', () => {
    const wrapper = shallowMount(TaskCard, {
      propsData: {
        task
      }
    });
    wrapper.find('.task').trigger('click');
    expect(wrapper.emitted().click[0]).toEqual([task.id]);
  });
});
