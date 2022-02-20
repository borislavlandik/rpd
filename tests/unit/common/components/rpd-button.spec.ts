import RpdButton from '@/common/components/button/rpd-button.vue';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import { h } from 'vue';

describe('Компонент', () => {
  describe('RPD кнопка', () => {
    it('Показываеет текст', () => {
      const buttonTitle = 'Hello World!';

      const wrapper = shallowMount(RpdButton, {
        slots: {
          default: () => h('Text', buttonTitle),
        },
      });

      expect(wrapper.text()).to.equal(buttonTitle);
    });

    it('Испускает собитые на клик', () => {
      const wrapper = shallowMount(RpdButton);

      wrapper.find('button').trigger('click');

      expect(wrapper.emitted()).to.have.property('click');
    });

    it('Не спускает событие, если кнопка отключена', () => {
      const wrapper = shallowMount(RpdButton, {
        props: {
          disabled: true,
        },
      });

      wrapper.find('button').trigger('click');

      expect('true').to.not.have.property('click');
    });
  });
});
