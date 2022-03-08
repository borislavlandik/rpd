<script setup lang="ts">
import RpdFormButtons from '@/common/components/form/buttons/rpd-form-buttons.vue';
import RpdInput from '@/common/components/form/input/rpd-input.vue';
import RpdSelect from '@/common/components/form/select/rpd-select.vue';
import RpdPreloader from '@/common/components/preloader/rpd-preloader.vue';

import useEditorTitle from './useEditorTitle';

const { data, isLoading } = useEditorTitle();
</script>

<template>
  <rpd-preloader :is-loading="isLoading">

  </rpd-preloader>
  <form v-if="data" class="form">
    <rpd-input
      v-model="data.subject"
      required
    >
      Название дисциплины
    </rpd-input>

    <div class="form__group">
      <rpd-input
        v-model="data.index"
        required
      >
        Индекс дисциплины
      </rpd-input>

      <rpd-select
        v-model="data.degree"
        required
        :options="[]"
      >
        Квалификация выпускника
      </rpd-select>
    </div>

    <rpd-select
      v-model="data.specialty"
      required
      :options="[]"
    >
      Направление подготовки / специальность
    </rpd-select>

    <rpd-select
      v-model="data.learning_profile"
      required
      :options="[]"
    >
      Направленность (профиль)  / специализация
    </rpd-select>

    <rpd-select
      v-model="data.chair"
      required
      :options="[]"
    >
      Выпускающая кафедра
    </rpd-select>

    <div class="form__group">
      <rpd-select
        v-model="data.semestrs"
        required
        mode="multiple"
        multiple-label="values"
        :close-on-select="false"
        :options="[1, 2, 3, 4, 5, 6, 7, 8]"
      >
        Семестры
      </rpd-select>

      <rpd-select
        v-model="data.study_form"
        required
        :options="[]"
      >
        Форма обучения
      </rpd-select>
    </div>

    <div class="form__group">
      <rpd-select
        v-model="data.courses"
        required
        :options="[]"
      >
        Курсы
      </rpd-select>

      <rpd-select
        v-model="data.year"
        required
        :options="[]"
      >
        Год плана набора
      </rpd-select>
    </div>
    <rpd-form-buttons></rpd-form-buttons>
  </form>
</template>
