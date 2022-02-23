import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    canShowAddButton?: boolean;
    breadcrumbs: string;
  }
}
