import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage';
import Game from './components/Game';
import Stats from './components/Stats';
import LogIn from './components/LogIn';
import History from './components/History';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
  { path: '/categories', name: 'HomePage', props: true, component: HomePage },
  { path: '/categories/:category', name: 'Game', props: true, component: Game },
  { path: '/stats', name: 'stats', props: true, component: Stats },
  { path: '/history', name: 'history', props: true, component: History },
  { path: '/', name: 'logIn', props: true, component: LogIn },
  { path: '*', component: LogIn },
];

const router = new VueRouter({
  routes: routes,
  mode: 'history',
});

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app');
