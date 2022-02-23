import { RouteRecordRaw } from 'vue-router';

export const editorRoutes: Array<RouteRecordRaw> = [
  {
    path: 'title',
    name: 'editor-title',
    component: () => import('@/views/editor/EditorTitle.vue'),
    meta: {
      breadcrumbs: 'Титульный лист',
    },
  },
  {
    path: 'goals',
    name: 'editor-goals',
    component: () => import('@/views/editor/EditorGoals.vue'),
    meta: {
      breadcrumbs: 'Цели и задачи. Место в структуре',
    },
  },
];
