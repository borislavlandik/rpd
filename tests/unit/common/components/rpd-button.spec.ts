import RpdButton from '@/common/components/button/rpd-button.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import { h } from 'vue';

describe('rpd-button.vue', () => {
  it('displays message', () => {
    const buttonTitle = 'Hello World!';

    const wrapper = shallowMount(RpdButton, {
      slots: {
        default: () => h('Text', buttonTitle),
      },
    });

    expect(wrapper.text()).to.equal(buttonTitle);
  });

  it('emit click event', () => {
    const wrapper = shallowMount(RpdButton);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted()).to.have.property('click');
  });

  it('not emit click on disable', () => {
    const wrapper = shallowMount(RpdButton, {
      props: {
        disabled: true,
      },
    });

    wrapper.find('button').trigger('click');

    expect('true').to.not.have.property('click');
  });
});
