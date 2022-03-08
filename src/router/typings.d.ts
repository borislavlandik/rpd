import 'vue-router';
import { IListSubject } from '@/views/useViewList.interface';

declare module 'vue-router' {
  interface RouteMeta {
    canShowAddButton?: boolean;
    breadcrumbs: string;
    breadcrumbsGlobalStore?: keyof IListSubject;
  }
}
