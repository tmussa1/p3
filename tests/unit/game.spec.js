import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Game from '@/components/Game.vue';

describe('Game', () => {
  const wrapper = shallowMount(Game);

  it('shows player name', () => {

    expect(typeof wrapper.data).toBe('function');
  });
});
