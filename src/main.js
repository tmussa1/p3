import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage';
import Game from './components/Game';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/', component: HomePage },
  { path: '/categories/:category', component: Game },
  { path: '*', component: HomePage },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app');
