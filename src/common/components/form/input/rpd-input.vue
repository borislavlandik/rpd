<script setup lang="ts">
import { useVModel } from '@vueuse/core';

import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import { computed } from 'vue';

interface IFormInputProps {
  modelValue?: string;

  placeholder?: string;
  icon?: string;

  required?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  valid?: boolean;
}

interface IFromInputEmits {
  (event: 'change', data: Event): void,
  (event: 'update:modelValue', data: string): void,
}

const props = withDefaults(defineProps<IFormInputProps>(), {
  required: false,
  disabled: false,
  invalid: false,
  valid: false,
});

const emit = defineEmits<IFromInputEmits>();

const value = useVModel(props, 'modelValue', emit);

const iconName = computed(() => {
  if (props.disabled) {
    return 'ui-circle-close';
  }

  if (props.invalid) {
    return 'ui-circle-error';
  }

  if (props.valid) {
    return 'ui-circle-check';
  }

  if (props.icon) {
    return props.icon;
  }

  return null;
});
</script>

<template>
  <div class="input-wrapper">
    <label class="input-title">
      <slot></slot>
      <span class="input-title__required" v-show="required">*</span>
    </label>
    <span
      class="input"
      :class="{
        'input_disabled': disabled,
        'input_valid': valid,
        'input_invalid': invalid,
        'input_with-icon': iconName
      }"
    >
      <input
        type="text"
        class="input__text"
        v-model="value"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        @change="emit('change', $event)"
      >
      <span class="input-icon">
        <rpd-icon v-if="iconName" :icon-name="iconName"></rpd-icon>
      </span>
    </span>
    <span class="input-hint">
      <slot name="hint"></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  display: inline-flex;
  flex-direction: column;

  min-width: 300px;
}

.input-title {
  margin-left: 1rem;

  font-weight: 700;
}

.input-title__required {
  margin-left: -.25rem;
}

.input-hint {
  margin-left: 1rem;

  font-style: italic;
  color: var(--text-colors-gray);
}

.input {
  position: relative;
}

.input__text {
  width: 100%;

  padding: .5rem .5rem .5rem 1rem;
  margin: 0;

  outline: none;
  border: none;
  border-radius: .25rem;
  color: var(--rpd-form-input-text-color, var(--text-colors-gray));
  background-color: var(--rpd-form-input-background-color, var(--main-colors-white));
  box-shadow: inset 0 0 0 2px var(--rpd-form-input-border-color, var(--text-colors-gray));

  transition-property: box-shadow, color;
  transition-duration: 100ms;
  transition-timing-function: ease-in-out;
}

.input__text:focus {
  --rpd-form-input-border-color:
    var(--rpd-form-input-border-color_focus, var(--main-colors-black));
  --rpd-form-input-text-color:
    var(--rpd-form-input-text-color_focus, var(--main-colors-black));

  box-shadow:
    inset 0 0 0 2px var(--rpd-form-input-border-color),
    0px 2px 0px var(--rpd-form-input-border-color);
}

.input_with-icon .input__text {
  padding: .5rem 2.5rem .5rem 1rem;
}

.input_valid {
  --rpd-form-input-border-color:
    var(--rpd-form-input-border-color_valid, var(--ui-colors-green-dark));
  --rpd-form-input-text-color:
    var(--rpd-form-input-text-color_valid, var(--ui-colors-green-dark));
  --rpd-form-input-icon-color: var(--ui-colors-green-dark);
}

.input_invalid {
  --rpd-form-input-border-color:
    var(--rpd-form-input-border-color_invalid, var(--ui-colors-red-dark));
  --rpd-form-input-text-color:
    var(--rpd-form-input-text-color_invalid, var(--ui-colors-red-dark));
  --rpd-form-input-icon-color: var(--ui-colors-red-dark);
}

.input_disabled {
  --rpd-form-input-border-color:
    var(--rpd-form-input-border-color_disabled, var(--text-colors-light-gray));
  --rpd-form-input-text-color:
    var(--rpd-form-input-text-color_disabled, var(--text-colors-light-gray));
  --rpd-form-input-icon-color: var(--text-colors-light-gray);
}

.input-icon {
  margin: 0;
  padding: 0;

  width: 24px;
  height: 24px;

  position: absolute;
  top: 50%;
  right: .5rem;

  color: var(--rpd-form-input-icon-color, var(--text-colors-dark-gray));

  transform: translateY(-50%);
}
</style>
