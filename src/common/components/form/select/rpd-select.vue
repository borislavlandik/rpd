<script setup lang="ts">
import Multiselect from '@vueform/multiselect';
import { useVModel } from '@vueuse/core';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import { pluralizeWithNumber } from '@/common/utils/pluralize';
import { joinLocal } from '@/common/utils/array-join-local';

export interface IFormSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface IFormSelectProps {
  modelValue?: number | number[] | string | string[];

  options?: number[] | string[] | IFormSelectOption[];

  mode?: 'single' | 'multiple' | 'tags';
  searchable?: boolean;
  closeOnSelect?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;

  multipleLabel?: 'default' | 'values';
}

interface IFromSelectEmits {
  (event: 'update:modelValue', data: string): void,
}

const props = withDefaults(defineProps<IFormSelectProps>(), {
  mode: 'single',
  searchable: true,
  closeOnSelect: true,
  required: false,
  disabled: false,
  multipleLabel: 'default',
});

const emit = defineEmits<IFromSelectEmits>();

const value = useVModel(props, 'modelValue', emit);

function defaultMultipleLabel(selectedValues: IFormSelectOption[]): string {
  return `Выбрано ${pluralizeWithNumber(selectedValues.length, ['значение', 'значения', 'значений'])}`;
}

function valuesMultipleLabel(selectedValues: IFormSelectOption[]): string {
  return joinLocal(selectedValues.map((v) => v.label).sort());
}

function getMultipleLabel(selectedValues: IFormSelectOption[]): string {
  switch (props.multipleLabel) {
    case 'default':
      return defaultMultipleLabel(selectedValues);
    case 'values':
      return valuesMultipleLabel(selectedValues);
    default:
      return '';
  }
}
</script>

<template>
  <div class="select-wrapper">
    <label class="select-title">
      <slot></slot>
      <span class="select-title__required" v-show="required">*</span>
    </label>
    <span class="select">
      <Multiselect
        v-model="value"
        :options="options ?? []"
        :no-options-text="'Список пустой'"
        :no-results-text="'Результатов не найдено'"
        :hide-selected="false"
        :multiple-label="getMultipleLabel"

        :mode="mode"
        :searchable="searchable"
        :close-on-select="closeOnSelect"
        :disabled="disabled"
        :placeholder="placeholder"
      >
      <template v-slot:tag="{ option, handleTagRemove, disabled: disabledTag }">
        <div class="tag">
          <span class="tag__text">{{ option.label }}</span>
          <rpd-icon
            class="tag__clear-icon"
            icon-name="ui-close"
            v-if="!disabledTag"
            :width="16"
            :height="16"
            @click.prevent="handleTagRemove(option, $event)"
          ></rpd-icon>
        </div>
      </template>

        <template v-slot:clear="{ clear }">
          <rpd-icon
            class="clear-icon"
            icon-name="ui-close"
            :width="24"
            :height="24"
            @click="clear"
          ></rpd-icon>
        </template>
        <template v-slot:caret>
          <rpd-icon
            class="caret-icon"
            icon-name="arrow-down"
            :width="24"
            :height="24"
          ></rpd-icon>
        </template>
      </Multiselect>
    </span>
    <span class="select-hint">
      <slot name="hint"></slot>
    </span>
  </div>
</template>

<style src="@/assets/styles/components/multiselect.scss" lang="scss"></style>

<style scoped lang="scss">
.select-wrapper {
  display: inline-flex;
  flex-direction: column;

  min-width: 300px;
}

.select-title {
  margin-left: 1rem;
}

.select-title__required {
  margin-left: -.25rem;

  color: var(--ui-colors-red-dark);
}

.select-hint {
  margin-left: 1rem;

  font-style: italic;
  color: var(--text-colors-gray);
}

.select {
  position: relative;
}

.clear-icon, .caret-icon {
  z-index: 2;
}

.tag {
  display: flex;
  align-items: center;

  max-width: 100%;

  padding: .25rem .5rem;

  border-radius: .25rem;
  background-color: var(--ui-colors-blue-light);

  color: var(--main-colors-white);
}

.tag__text {
  max-width: calc(100% - 16px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
