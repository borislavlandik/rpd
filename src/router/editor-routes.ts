import { RouteRecordRaw } from 'vue-router';

export const editorRoutes: Array<RouteRecordRaw> = [
  {
    path: 'title',
    name: 'editor-title',
    component: () => import('@/views/editor/title/EditorTitle.vue'),
    meta: {
      breadcrumbs: 'Титульный лист',
    },
  },
  {
    path: 'title/edit',
    name: 'editor-title-edit',
    component: () => import('@/views/editor/title/EditorTitleEdit.vue'),
    meta: {
      breadcrumbs: 'Редактирование титульного листа',
    },
  },
  {
    path: 'goals',
    name: 'editor-goals',
    component: () => import('@/views/editor/goals/EditorGoals.vue'),
    meta: {
      breadcrumbs: 'Цели и задачи. Место в структуре',
    },
  },
];
