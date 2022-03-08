<script setup lang="ts">
import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import RpdEditorHeaderHint from '@/common/components/editor/header-hint/rpd-editor-header-hint.vue';
import RpdPreloader from '@/common/components/preloader/rpd-preloader.vue';

import { joinLocal } from '@/common/utils/array-join-local';

import useEditorTitle from './useEditorTitle';

const { data, isLoading } = useEditorTitle();
</script>

<template>
  <rpd-preloader :is-loading="isLoading">
    <rpd-editor-header-hint>
      <template v-slot:default>
        Титульный лист является первой страницей программы дисциплины <br>
        и содержит её основные реквизиты.
      </template>
      <template v-slot:button>
        <router-link
          custom
          :to="{ name: 'editor-title-edit' }"
          v-slot="{ navigate }"
        >
          <rpd-button appearance="fill" @click="navigate">
            Редактировать
            <rpd-icon right icon-name="ui-circle-check"></rpd-icon>
          </rpd-button>
        </router-link>
      </template>
    </rpd-editor-header-hint>

    <div v-if="data" class="content">
      <h3>Общая информация о дисциплине</h3>

      <p>
        Название дисциплины:
        <b>{{ data.subject }}</b>
      </p>

      <p>
        Индекс дисциплины:
        <b>{{ data.index }}</b>
      </p>

      <p>
        Направление подготовки / специальность:
        <b>{{ data.specialty_code }} {{ data.specialty }}</b>
      </p>

      <p>
        Направленность (профиль) / специализация:
        <b>{{ data.specialty }}</b>
      </p>

      <p>
        Квалификация выпускника:
        <b>{{ data.degree }}</b>
      </p>

      <p>
        Форма обучения:
        <b class="lowercase">{{ data.study_form }}</b>
      </p>

      <p>
        Выпускающая кафедра:
        <b>{{ data.chair }}</b>
      </p>

      <p>Курс(ы): <b>{{ joinLocal(data.courses) }}</b></p>
      <p>Семестр(ы): <b>{{ joinLocal(data.semestrs) }}</b></p>
      <p>Учебный план набора <b>{{ data.year }}</b> года</p>
    </div>
  </rpd-preloader>
</template>

<style scoped lang="scss">
</style>
