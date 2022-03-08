<script setup lang="ts">
import { ref } from 'vue';

import RpdFormButtons from '@/common/components/form/buttons/rpd-form-buttons.vue';
import RpdInput from '@/common/components/form/input/rpd-input.vue';
import RpdSelect, { IFormSelectOption } from '@/common/components/form/select/rpd-select.vue';

interface ICreateRpdForm {
  subject: string;
  subjectIndex: string;
  specialty: string;
  specialization: string;
  chair: string;
  degree: string;
  studyForm: string;
  courses: string[];
  years: string[];
}

const formState = ref<ICreateRpdForm>({
  subject: '',
  subjectIndex: '',
  specialty: '',
  specialization: '',
  chair: '',
  degree: '',
  studyForm: '',
  courses: [],
  years: [],
});

const studyForms: IFormSelectOption[] = [
  {
    label: 'Очная',
    value: '1',
  },
  {
    label: 'Очно-заочная',
    value: '2',
  },
  {
    label: 'Заочная',
    value: '3',
  },
];

const degrees: IFormSelectOption[] = [
  {
    label: 'Бакалавр',
    value: '1',
  },
  {
    label: 'Магистр',
    value: '2',
  },
];
</script>

<template>
  <form class="form">
    <rpd-input
      v-model="formState.subject"
      required
    >
      Название дисциплины
    </rpd-input>

    <rpd-input
      v-model="formState.subjectIndex"
      required
    >
      Индекс дисциплины
    </rpd-input>

    <rpd-select
      v-model="formState.specialty"
      required
      :options="[]"
    >
      Направление подготовки / специальность
    </rpd-select>

    <rpd-select
      v-model="formState.specialization"
      required
      :options="[]"
    >
      Направленность (профиль)  / специализация
    </rpd-select>

    <rpd-select
      v-model="formState.chair"
      required
      :options="[]"
    >
      Выпускающая кафедра
    </rpd-select>

    <div class="form__group">
      <rpd-select
        v-model="formState.degree"
        required
        :options="degrees"
      >
        Квалификация выпускника
      </rpd-select>

      <rpd-select
        v-model="formState.studyForm"
        required
        :options="studyForms"
      >
        Форма обучения
      </rpd-select>
    </div>

    <div class="form__group">
      <rpd-select
        v-model="formState.courses"
        required
        :options="[]"
      >
        Курсы
      </rpd-select>

      <rpd-select
        v-model="formState.years"
        required
        :options="[]"
      >
        Год плана набора
      </rpd-select>
    </div>

    <rpd-form-buttons></rpd-form-buttons>
  </form>
</template>
