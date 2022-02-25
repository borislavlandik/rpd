<script setup lang="ts">
import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import RpdEditorHeaderHint from '@/common/components/editor/header-hint/rpd-editor-header-hint.vue';
</script>

<template>
  <div>
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

    <div class="content">
      <h3>Общая информация о дисциплине</h3>

      <p>
        Название дисциплины:
        <b>Информационные технологии в прогнозировании экономических процессов</b>
      </p>

      <p>
        Индекс дисциплины:
        <b>Б1.В.ДВ.03.01</b>
      </p>

      <p>
        Направление подготовки / специальность:
        <b>09.03.03 Прикладная информатика</b>
      </p>

      <p>
        Направленность (профиль) / специализация:
        <b>Проектирование и разработка информационных систем</b>
      </p>

      <p>
        Квалификация выпускника:
        <b>Бакалавр</b>
      </p>

      <p>
        Форма обучения:
        <b>очная</b>
      </p>

      <p>
        Выпускающая кафедра:
        <b>Кафедра алгебраических и информационных систем</b>
      </p>

      <p>Курс(ы): <b>1 и 2</b></p>
      <p>Семестр(ы): <b>1, 2 и 3</b></p>
      <p>Учебный план набора <b>2022</b> года</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
