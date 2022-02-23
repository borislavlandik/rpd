import { RouteRecordRaw } from 'vue-router';
import { editorRoutes } from './editor-routes';

export const mainRotes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: {
      canShowAddButton: true,
      breadcrumbs: 'Главная',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      breadcrumbs: 'Вход в систему',
    },
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/List.vue'),
    meta: {
      breadcrumbs: 'Список дисциплин',
    },
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('@/views/Create.vue'),
    meta: {
      breadcrumbs: 'Создание рабочей программы',
    },
  },
  {
    path: '/rpd/:id',
    name: 'editor',
    component: () => import('@/views/Editor.vue'),
    redirect: (to) => ({
      name: 'editor-title',
      params: to.params,
    }),
    children: editorRoutes,
    meta: {
      breadcrumbs: 'Рабочая программа',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: () => '/',
  },
];
