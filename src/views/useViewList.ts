import { useBaseAPI } from '@/api';

import { ref, computed, Ref } from 'vue';
import { sortByAsc, sortByDesc } from '@/common/utils/sort-by';

interface IListFormFilters {
  chair: string;
  specialty: string;
  degree: string;
  year: string;
  subject: string;
}

interface IListSubject {
  id: string;
  subject: string;
  specialty_code: string;
  specialty: string;
  learning_profile: string;
  study_form: string;
  year: string;
  last_edit: string;
  creation_date: string;
  status: string;
}

type IListFormFiltersOptions = Record<keyof IListFormFilters, string[]>;

interface IListApiResponse {
  filters: IListFormFiltersOptions;
  subjects: IListSubject[];
}

interface IListSortButton {
  key: keyof IListSubject;
  title: string;
  sort: () => void;
}

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

  const { data, isLoading } = useBaseAPI<IListApiResponse>('/programs');
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
