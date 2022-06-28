import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import components from 'dialtone-combinator';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),

  routes: [
    { path: '/', component: App },
    ...Object.values(components).map(component => {
      return { path: `/${component.name}`, component };
    }),
  ],
});

const app = createApp({});
app.use(router);
app.mount('#app');
