import { shallowMount } from '@vue/test-utils';
import AppModal from '@/common/components/AppModal';
import AppButton from '@/common/components/AppButton';

const defaultSlot = 'content';

describe('AppModal', () => {
  it('AppModal renders out the slot content', () => {
    const wrapper = shallowMount(AppModal, {
      stubs: {
        AppButton
      },
      slots: {
        default: defaultSlot
      }
    });

    expect(wrapper.html()).toContain(defaultSlot);
  });
});
