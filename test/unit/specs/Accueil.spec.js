import Vue from 'vue';
import Accueil from '@/components/Accueil';

describe('Accueil.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Accueil);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
