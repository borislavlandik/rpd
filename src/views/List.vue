<script setup lang="ts">
import RpdSelect from '@/common/components/form/select/rpd-select.vue';
import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import RpdPreloader from '@/common/components/preloader/rpd-preloader.vue';

import { formatISODateTime } from '@/common/utils/date-time';

import useViewList from './useViewList';

const {
  isLoading,
  filterForm,
  filters,
  filterList,
  resetFilters,
  sortByMsg,
  sortedSubjects,
  toggleSort,
  isAscSort,
  sortButtons,
} = useViewList();

</script>

<template>
  <rpd-preloader :is-loading="isLoading">
    <form class="filters" @submit.prevent="filterList()">
      <h6 class="filters__title">Фильтры дисциплин</h6>
      <div class="filters__content">
        <rpd-select
          v-model="filterForm.chair"
          mode="single"
          placeholder="-- Не выбрано --"
          :options="filters.chair"
        >
        Кафедра
        </rpd-select>
        <rpd-select
          v-model="filterForm.specialty"
          mode="single"
          placeholder="-- Не выбрано --"
          :options="filters.specialty"
        >
          Направление
        </rpd-select>
        <rpd-select
          v-model="filterForm.degree"
          mode="single"
          placeholder="-- Не выбрано --"
          :options="filters.degree"
        >
          Уровень
        </rpd-select>
        <rpd-select
          v-model="filterForm.year"
          mode="single"
          placeholder="-- Не выбрано --"
          :options="filters.year"
        >
          Год набора
        </rpd-select>
        <rpd-select
          v-model="filterForm.subject"
          mode="single"
          placeholder="-- Не выбрано --"
          :options="filters.subject"
        >
          Дисциплина
        </rpd-select>
        <div class="filter__buttons">
          <rpd-button
            type="submit"
            appearance="fill"
          >Применить</rpd-button>
          <rpd-button
            type="button"
            appearance="outline"
            @click="resetFilters()"
          >Очистить</rpd-button>
        </div>
      </div>
    </form>
    <div class="list">
      <h3 class="list__title">
        Добавленные рабочие программы
        <VMenu
          class="sort"
          placement="bottom-end"
          auto-hide
          :hideTriggers="(triggers: string[]) => [...triggers, 'click']"
        >
          <rpd-button
            class="sort__button"
            v-tooltip.top="`Сортировка списка ${isAscSort ? 'по возрастанию' : 'по убыванию'}`"
            appearance="fill"
            @click="toggleSort"
          >
            {{ sortByMsg }}
            <rpd-icon
              right
              :width="24"
              :height="24"
              :icon-name="isAscSort ? 'arrow-up-chevron' : 'arrow-down-chevron'"
            ></rpd-icon>
          </rpd-button>

          <template #popper>
            <div class="sort__list">
              <rpd-button
                class="sort__list-button"
                v-for="button of sortButtons"
                :key="button.key"
                @click="button.sort"
              >
                {{ button.title }}
              </rpd-button>
            </div>
          </template>
        </VMenu>
      </h3>
      <div
        class="list-item"
        v-for="subject in sortedSubjects"
        :key="subject.id"
      >
        <div class="list-item__text">
          <h5 class="list-item__subject">
            <rpd-icon left inline icon-name="ui-circle-check"></rpd-icon>
            {{ subject.subject }}
          </h5>
          <div class="list-item__specialty">
            <b>{{ subject.specialty_code }} {{ subject.specialty }}</b>
            <b>{{ subject.learning_profile }}</b>
            <b>{{ subject.year }}</b>
          </div>
          <span class="list-item__date">
            Дата и время последнего редактирования (создания) программы:
            {{ formatISODateTime(subject.last_edit) }}
            ({{ formatISODateTime(subject.creation_date) }})
          </span>
        </div>
        <div class="list-item__buttons">
          <router-link
            :to="{ name: 'editor', params: { id: subject.id } }"
            custom
            v-slot="{ navigate }"
          >
            <rpd-button
              v-tooltip.top-end="'Редактировать'"
              icon
              appearance="outline"
              @click="navigate"
            >
              <rpd-icon :width="24" :height="24" icon-name="ui-pen"></rpd-icon>
            </rpd-button>
          </router-link>
          <rpd-button
            v-tooltip.top-end="'Загрузить'"
            icon
            appearance="outline"
          >
            <rpd-icon :width="24" :height="24" icon-name="arrow-download"></rpd-icon>
          </rpd-button>
          <rpd-button
            v-tooltip.bottom-end="'Скопировать'"
            icon
            appearance="outline"
          >
            <rpd-icon :width="24" :height="24" icon-name="file-copy-document"></rpd-icon>
          </rpd-button>
          <rpd-button
            class="list-item__button_red"
            v-tooltip.bottom-end="'Удалить'"
            icon
            appearance="outline"
          >
            <rpd-icon :width="24" :height="24" icon-name="ui-trash"></rpd-icon>
          </rpd-button>
        </div>
      </div>
    </div>
  </rpd-preloader>
</template>

<style scoped lang="scss">
.filters {
  display: flex;
  flex-direction: column;

  padding: 1rem;
  margin-bottom: 1rem;

  border: 2px solid var(--main-colors-black);
  border-radius: .5rem;
}
.filters__title {
  margin-bottom: .5rem;
}

.filters__content {
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: .5rem;
}

.filter__buttons {
  display: flex;
  gap: .5rem;

  height: 40px;
}

.list__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort__list {
  display: flex;
  flex-direction: column;

  padding: .5rem;
}

.sort__list-button {
  padding: .5rem;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  padding: .5rem .5rem .5rem 1rem;

  border: 2px solid var(--main-colors-black);
  border-radius: .5rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.list-item__text {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.list-item__subject {
  display: flex;
  align-items: center;

  color: var(--ui-colors-green-darkest);
}

.list-item__specialty {
  display: flex;
  gap: 2rem;
}

.list-item__buttons {
  display: grid;
  grid-template: repeat(2, fit-content(40px)) / repeat(2, fit-content(40px),);
  grid-auto-flow: row;
  gap: .5rem;
}

.list-item__button_red {
  --rpd-button-border-color: var(--ui-colors-red-darkest);
  --rpd-button-text-color: var(--ui-colors-red-darkest);
  --rpd-button-background-color: var(--ui-colors-red-darkest);
}
</style>
