<script setup lang="ts">
import { ref } from 'vue';

import { LocalStorageKeys } from '@/common/utils/local-storage-keys';

import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import { useRoute } from 'vue-router';

interface IEditorMenuElement {
  label: string;
  simplifiedLabel: string;
  routeName: string;
  isActive?: boolean;
  isValid: boolean;
}

const route = useRoute();

const isSimplified = ref(localStorage.getItem(LocalStorageKeys.RpdEditorMenu) === 'simplified');
const menuElements = ref<IEditorMenuElement[]>([
  {
    label: '1. Титульный лист',
    simplifiedLabel: '1',
    routeName: 'editor-title',
    isValid: true,
  },
  {
    label: '2. Цели и задачи. Место в структуре',
    simplifiedLabel: '2',
    routeName: 'editor-goals',
    isValid: true,
  },
  {
    label: '3. Результаты освоения дисцилины',
    simplifiedLabel: '3',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '4. Объем и виды учебной работы',
    simplifiedLabel: '4',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '5.1 Содержание разделов и тем',
    simplifiedLabel: '5.1',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '5.2 Междисциплинарные связи',
    simplifiedLabel: '5.2',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '5.3 Разделы и темы',
    simplifiedLabel: '5.3',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '6. Семинарские, практ. занятия и лаб. работы',
    simplifiedLabel: '6',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '6.1 План самостоятельной работы',
    simplifiedLabel: '6.1',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '6.2 Методические указания',
    simplifiedLabel: '6.2',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '7. Тематика курсовых работ',
    simplifiedLabel: '7',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '8. Учебно-методическое и информ. обеспечение',
    simplifiedLabel: '8',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '9. Материально-техническое обеспечение',
    simplifiedLabel: '9',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '10. Образовательные технологии',
    simplifiedLabel: '10',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '11. Оценочные средства',
    simplifiedLabel: '11',
    routeName: 'home',
    isValid: false,
  },
  {
    label: '12. Разработчики',
    simplifiedLabel: '12',
    routeName: 'home',
    isValid: false,
  },
]);

function toggleMenu(): void {
  isSimplified.value = !isSimplified.value;
  localStorage.setItem(LocalStorageKeys.RpdEditorMenu, isSimplified.value ? 'simplified' : 'full');
}

function isActive(routeName: string): boolean {
  return route.name?.toString().startsWith(routeName) ?? false;
}
</script>

<template>
  <div class="editor-menu" :class="{ 'editor-menu_simplified' : isSimplified }">
    <div class="editor-menu__header">
      <h3 class="edit-menu__title">
        {{ isSimplified ? 'Струк.' : 'Структура рабочей программы'}}
      </h3>
      <rpd-button
        v-tooltip.top-end="{
          content: isSimplified ? 'Раскрыть меню' : 'Скрыть меню'
        }"
        @click="toggleMenu()"
      >
        <rpd-icon
          :width="20"
          :heigth="20"
          :icon-name="isSimplified ? 'content-indent-left' : 'content-indent-right'"
        ></rpd-icon>
      </rpd-button>
    </div>
    <nav class="nav">
      <router-link
        v-for="element in menuElements"
        :key="element.routeName"
        :to="{ name: element.routeName }"

        custom
        v-slot="{ navigate }"
      >
        <button
          class="nav__button"
          v-tooltip.left="{
            content: element.label,
            disabled: !isSimplified
          }"
          :class="{ 'nav__button_active': isActive(element.routeName) }"
          @click="navigate"
        >
          <rpd-icon
            class="nav__button-icon"
            :class="{ 'nav__button-icon_valid': element.isValid }"
            :icon-name="element.isValid ? 'ui-check' : 'ui-close'"
          ></rpd-icon>

          {{ isSimplified ? element.simplifiedLabel : element.label}}
        </button>
      </router-link>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.editor-menu {
  width: 350px;

  transition: width .3s ease-in-out;

  &.editor-menu_simplified {
    width: 88px;
  }
}

.editor-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: .5rem;
}

.edit-menu__title {
  margin-bottom: 0;

  font-size: 1rem;
  font-weight: 700;

  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.nav {
  display: flex;
  flex-direction: column;

  padding: 2px;

  border-radius: .5rem;

  box-shadow: inset 0 0 0 2px var(--main-colors-black);
}

.nav__button {
  display: flex;
  gap: .5rem;

  padding: .25rem .5rem;

  border: none;

  color: var(--main-colors-black);
  background-color: var(--main-colors-white);

  font-size: .75rem;
  text-align: left;
  line-height: 1.5rem;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;

  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 1px solid var(--text-colors-light-gray);
  }

  &:first-child {
    border-radius: .4rem .4rem 0 0;
  }

  &:last-child {
    border-radius: 0 0 .4rem .4rem;
  }
}

.nav__button_active {
  color: var(--main-colors-white);
  background-color: var(--text-colors-dark-gray);
}

.nav__button-icon {
  color: var(--ui-colors-red-dark);
}

.nav__button-icon_valid {
  color: var(--ui-colors-green-dark);
}
</style>
