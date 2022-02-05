<script setup lang="ts">
import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import { ref } from 'vue';

const appearance = ref<'fill' | 'outline'>('fill');

function changeAppearance() {
  appearance.value = appearance.value === 'fill' ? 'outline' : 'fill';
}
</script>

<template>
  <rpd-button :appearance="appearance" @click="changeAppearance">
    Какая-то кнопка
    <rpd-icon right iconName="arrow_right_arrow"></rpd-icon>
  </rpd-button>
  <rpd-button icon class="icon-button">
    <rpd-icon iconName="arrow_right_arrow"></rpd-icon>
  </rpd-button>
</template>

<style lang="scss">
</style>
