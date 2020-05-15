import { expect } from 'chai';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import { BCardGroup, BRow, BCard, BCardText, BButton } from 'bootstrap-vue';
import HomePage from '@/components/HomePage.vue';

describe('HomePage', () => {
  it('shows list of categories', () => {
    const wrapper = shallowMount(HomePage, {
      stubs: {
        RouterLink: RouterLinkStub,
        'b-card-group': BCardGroup,
        'b-row': BRow,
        'b-card': BCard,
        'b-card-text': BCardText,
        'b-button': BButton,
      },
    });

    let products = [
      {
        category: 'Chicken',
        wordList: {
          easy: ['Barbecue', 'Bedding', 'Breast', 'Brown'],
          medium: ['Barn', 'Egg', 'Breed', 'Broiler'],
          hard: ['Beak', 'Buff'],
        },
      },
      {
        category: 'Texas Life',
        wordList: {
          easy: ['Herd', 'Hero', 'Hides', 'Hike', 'Hillside', 'Historic'],
          medium: [
            'Homestead',
            'Horseback',
            'Horses',
            'Hospitable',
            'Hostility',
            'Hunger',
            'Hunt',
          ],
          hard: ['Habitat', 'Hardy', 'Harsh', 'Haul'],
        },
      },
    ];

    wrapper.data = products;

    wrapper.data = expect(typeof wrapper.data).to.equal('object');
    expect(wrapper.text()).to.include(products[0].category);
    expect(wrapper.text()).to.include(products[1].category);
    expect(wrapper.html()).to.contain(
      "Let's play"
    );
    expect(wrapper.html()).to.contain(
      'Category - Chicken'
    );
    expect(wrapper.html()).to.contain(
      'Category - Texas Life'
    );
  });
});
