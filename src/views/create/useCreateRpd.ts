import { useBaseAPI } from '@/api';
import { computed, watch } from 'vue';

interface ICreateRpdNameIdResponse {
  id: number;
  name: string;
}

interface ICreateRpdGetResponse {
  subjects: ICreateRpdNameIdResponse[];
  specialties: (ICreateRpdNameIdResponse & { code: string })[];
  learning_profiles: ICreateRpdNameIdResponse[];
  chairs: {
    id: number;
    name: string;
    number?: any;
    faculty: ICreateRpdNameIdResponse;
  }[];
  degrees: ICreateRpdNameIdResponse[];
  studyForms: ICreateRpdNameIdResponse[];
}

function useCreateRpd(): any {
  const { data, isLoading, isFinished } = useBaseAPI<ICreateRpdGetResponse>('/programs/new');

  const formData = computed(() => {
    const convertToSelectOptions = (array?: ICreateRpdNameIdResponse[]):
      { value: string, label: string }[] => array?.map((v) => ({
        value: v.id.toString(),
        label: v.name,
      })) ?? [];

    const dataValue = data.value;

    return {
      subjects: convertToSelectOptions(dataValue?.subjects),
      specialties: convertToSelectOptions(dataValue?.specialties),
      learning_profiles: convertToSelectOptions(dataValue?.learning_profiles),
      chairs: convertToSelectOptions(dataValue?.chairs),
      degrees: convertToSelectOptions(dataValue?.degrees),
      studyForms: convertToSelectOptions(dataValue?.studyForms),
    };
  });

  return { data };
}

export default useCreateRpd;
