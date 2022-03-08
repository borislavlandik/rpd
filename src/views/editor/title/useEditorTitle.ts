import { Ref } from 'vue';
import { useRoute } from 'vue-router';

import { useBaseAPI } from '@/api';

interface IEditorTitleApiResponse {
  specialty_code: string;
  courses: number[];
  specialty: string;
  year: number;
  subject: string;
  chair: string;
  study_form: string;
  degree: string;
  index: string;
  learning_profile: string;
  semestrs: number[];
}

interface IEditorTitleReturnType {
  isLoading: Ref<boolean>;
  data: Ref<IEditorTitleApiResponse | undefined>;
}

function useEditorTitle(): IEditorTitleReturnType {
  const { params } = useRoute();
  const { data, isLoading } = useBaseAPI<IEditorTitleApiResponse>(`programs/${params?.id}/cover-sheet`);

  return {
    isLoading,
    data,
  };
}

export default useEditorTitle;
