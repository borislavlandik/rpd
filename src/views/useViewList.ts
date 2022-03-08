import {
  ref,
  computed,
  Ref,
  watch,
} from 'vue';

import { useBaseAPI } from '@/api';
import { sortByAsc, sortByDesc } from '@/common/utils/sort-by';
import { useGlobalRpdStore } from '@/store/storeCurrentRpd';
import {
  IListFormFilters,
  IListFormFiltersOptions,
  IListSubject,
  IListSortButton,
  IListApiResponse,
} from './useViewList.interface';

interface IListUseReturnType {
  isLoading: Ref<boolean>;
  filterForm: Ref<IListFormFilters>;
  filters: Ref<IListFormFiltersOptions>;
  sortedSubjects: Ref<IListSubject[]>;
  sortByMsg: Ref<string>;
  isAscSort: Ref<boolean>;
  sortButtons: IListSortButton[],
  toggleSort: () => void;
  resetFilters: () => void;
  filterList: () => void;
}

function useViewList(): IListUseReturnType {
  const defaultFilterValues: IListFormFilters = {
    chair: '',
    specialty: '',
    degree: '',
    year: '',
    subject: '',
  };

  const defaultFilterOptionsValues: IListFormFiltersOptions = {
    chair: [],
    specialty: [],
    degree: [],
    year: [],
    subject: [],
  };

  const defaultSubjectValues: Omit<IListSubject, 'id'> = {
    subject: '',
    specialty_code: '',
    specialty: '',
    learning_profile: '',
    study_form: '',
    year: '',
    last_edit: '',
    creation_date: '',
    status: '',
  };

  const filterForm = ref<IListFormFilters>({ ...defaultFilterValues });

  const { data, isLoading, isFinished } = useBaseAPI<IListApiResponse>('/programs');
  const subjects = computed(() => data.value?.subjects ?? []);
  const filters: Ref<IListFormFiltersOptions> = computed(() => data.value?.filters
    ?? defaultFilterOptionsValues);

  function getSortNameMsg(sortName: keyof IListSubject): string {
    switch (sortName) {
      case 'subject': return 'По дисциплине';
      case 'specialty_code': return 'По коду направления';
      case 'specialty': return 'По направлению';
      case 'learning_profile': return 'По профилю обучения';
      case 'study_form': return 'По форме обучения';
      case 'year': return 'По году набора';
      case 'last_edit': return 'По дате последего редактирования';
      case 'creation_date': return 'По дате создания';
      case 'status': return 'По статусу';
      default: return '';
    }
  }

  const sortBy = ref<keyof IListSubject>('subject');
  const isAscSort = ref(true);
  const sortByMsg = computed(() => getSortNameMsg(sortBy.value));

  const globalRpdStore = useGlobalRpdStore();

  const sortedSubjects = computed(
    () => (isAscSort.value
      ? sortByAsc(subjects.value, sortBy.value)
      : sortByDesc(subjects.value, sortBy.value)),
  );

  function resetFilters(): void {
    filterForm.value = { ...defaultFilterValues };
  }

  function filterList(): void {
    // console.log(filterForm.value);
  }

  function setSort(prop: keyof IListSubject): void {
    if (sortBy.value === prop) {
      isAscSort.value = !isAscSort.value;
    }

    sortBy.value = prop;
  }

  function toggleSort(): void {
    isAscSort.value = !isAscSort.value;
  }

  watch(isFinished, (value) => {
    if (value) {
      globalRpdStore.list = subjects.value;
    }
  });

  const sortButtons = (Object.keys(defaultSubjectValues) as Array<keyof IListSubject>).map(
    (key) => ({
      key,
      title: getSortNameMsg(key),
      sort: () => setSort(key),
    }),
  );

  return {
    isLoading,
    filterForm,
    filters,
    sortedSubjects,
    sortByMsg,
    isAscSort,
    sortButtons,
    toggleSort,
    resetFilters,
    filterList,
  };
}

export default useViewList;
