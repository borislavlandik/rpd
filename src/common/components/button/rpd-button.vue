<script setup lang="ts">
type IButtonSizes = 'default' | 'small';
type IButtonApeerance = 'default' | 'fill' | 'outline';

interface IButtonProps {
  appearance?: IButtonApeerance;
  size?: IButtonSizes;
  disabled?: boolean;
}

interface IButtonEmits {
  (event: 'click', data: MouseEvent): void
}

withDefaults(defineProps<IButtonProps>(), {
  appearance: 'default',
  size: 'default',
  disabled: false,
});

const emit = defineEmits<IButtonEmits>();
</script>

<template>
  <button
    class="button"
    :class="[ 'button_style_' + appearance, 'button_size_' + size ]"
    :disabled="disabled"
    @click="emit('click', $event);"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  display: flex;
  flex-direction: row;
  align-items: center;

  position: relative;

  background: none;
  border: none;
  border-radius: .25rem;
  box-shadow: inset 0 0 0 .125rem var(--rpd-button-border-color, var(--main-colors-black));

  font-weight: 700;

  transition-property: background-color, color, box-shadow;
  transition-duration: 100ms;
  transition-timing-function: ease-in-out;

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  /** Sizes */

  &_size_default {
    padding: .5rem 1rem;
    font-size: var(--font-size-text-main-default);
  }

  &_size_small {
    padding: .25rem .5rem;
    font-size: var(--font-size-text-small-default);
  }

  &_icon {
    padding: .5rem;
  }

  /** Styles (appearance) */

  &_style_default {
    padding: 0;
    box-shadow: none;

    color: var(--rpd-button-text-color, var(--main-colors-black));

    &:hover {
      color: var(--rpd-button-hover-text-color, var(--main-colors-white));
      background-color: var(--rpd-button-background-color, var(--main-colors-black));
    }
  }

  &::before {
    display: block;
    height: 0;
    width: 100%;

    position: absolute;
    left: 0;
    top: 0;

    z-index: -1;

    content: '';

    background-color: var(--rpd-button-background-color, var(--main-colors-black));
    border-radius: .25rem;

    transition-property: height, top, bottom;
    transition-duration: 100ms;
    transition-timing-function: ease-in-out;
  }

  &_style_fill {
    color: var(--rpd-button-text-color, var(--main-colors-white));

    &::before {
      height: 100%;

      bottom: 0%;
      top: auto;
    }

    &:not(:disabled):hover {
      color: var(--rpd-button-hover-text-color, var(--main-colors-black));

      &::before {
        top: 0;
        height: 0;
      }
    }

    &:disabled {
      color: var(--rpd-button-disabled-text-color, var(--text-colors-dark-gray));
      background-color: var(--rpd-button-disabled-background-color, var(--text-colors-light-gray));
      box-shadow:
        inset 0 0 0 .125rem var(--rpd-button-disabled-border-color, var(--text-colors-light-gray));
    }
  }

  &_style_outline {
    color: var(--rpd-button-text-color, var(--main-colors-black));

    &:not(:disabled):hover {
      color: var(--rpd-button-hover-text-color, var(--main-colors-white));

      &::before {
        height: 100%;

        bottom: 0%;
        top: auto;
      }
    }

    &:disabled {
      color: var(--rpd-button-disabled-text-color, var(--text-colors-light-gray));
      box-shadow:
        inset 0 0 0 .125rem var(--rpd-button-disabled-border-color, var(--text-colors-light-gray));
    }
  }
}
</style>
