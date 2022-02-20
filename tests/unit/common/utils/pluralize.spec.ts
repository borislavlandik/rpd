import { expect } from 'chai';
import { pluralize } from '@/common/utils/pluralize';

describe('Utils функции', () => {
  describe('pluralize', () => {
    const words: Record<string, [string, string, string]> = {
      bears: ['медведь', 'медведя', 'медведей'],
    };

    it('Сколнение для 0', () => {
      expect(pluralize(0, words.bears)).to.equal('медведей');
    });

    it('Сколнение для 1', () => {
      expect(pluralize(1, words.bears)).to.equal('медведь');
    });

    it('Сколнение для 2', () => {
      expect(pluralize(2, words.bears)).to.equal('медведя');
    });

    it('Сколнение для 10', () => {
      expect(pluralize(10, words.bears)).to.equal('медведей');
    });

    it('Сколнение для 11', () => {
      expect(pluralize(11, words.bears)).to.equal('медведей');
    });

    it('Сколнение для 21', () => {
      expect(pluralize(21, words.bears)).to.equal('медведь');
    });

    it('Сколнение для 22', () => {
      expect(pluralize(22, words.bears)).to.equal('медведя');
    });

    it('Сколнение для 100', () => {
      expect(pluralize(100, words.bears)).to.equal('медведей');
    });

    it('Сколнение для 101', () => {
      expect(pluralize(101, words.bears)).to.equal('медведь');
    });

    it('Сколнение для 1000', () => {
      expect(pluralize(1000, words.bears)).to.equal('медведей');
    });
  });
});
