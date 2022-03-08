import { defineStore } from 'pinia';

import { IListApiResponse, IListSubject } from '@/views/useViewList.interface';
import { baseAPIInstance } from '@/api';

export const useGlobalRpdStore = defineStore('globalRpdData', {
  state: () => ({
    list: [] as IListSubject[],
  }),
  actions: {
    async restoreData(): Promise<void> {
      const response = await baseAPIInstance.get<IListApiResponse>('/programs');
      this.list = response.data.subjects;
    },
  },
});
