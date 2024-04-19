import { createWebHistory, createRouter } from 'vue-router';
import Home from '../pages/Home.vue';
import { loadLayoutMiddleware } from '../helpers/layoutMiddleware';
import Appearance from '../pages/settings/Appearance.vue';

const routes = [
  {
    path: '/',
    name: 'Images',
    component: Home,
    meta: {
      layout: 'SidebarLayout',
    },
  },
  {
    path: '/documents',
    name: 'Documents',
    component: Home,
    meta: {
      layout: 'SidebarLayout',
    },
  },
  {
    path: '/audio',
    name: 'Audio',
    component: Home,
    meta: {
      layout: 'SidebarLayout',
    },
  },
  {
    path: '/video',
    name: 'Video',
    component: Home,
    meta: {
      layout: 'SidebarLayout',
    },
  },
  {
    path: '/tags',
    name: 'Tags',
    component: Home,
    meta: {
      layout: 'SidebarLayout',
    },
  },
  {
    path: '/settings/appearance',
    name: 'Settings/Appearance',
    component: Appearance,
    meta: {
      layout: 'SidebarLayout',
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(loadLayoutMiddleware);

export default router;
