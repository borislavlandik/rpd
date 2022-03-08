export interface IListFormFilters {
  chair: string;
  specialty: string;
  degree: string;
  year: string;
  subject: string;
}

export interface IListSubject {
  id: number;
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

export type IListFormFiltersOptions = Record<keyof IListFormFilters, string[]>;

export interface IListApiResponse {
  filters: IListFormFiltersOptions;
  subjects: IListSubject[];
}

export interface IListSortButton {
  key: keyof IListSubject;
  title: string;
  sort: () => void;
}
