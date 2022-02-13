<script setup lang="ts">
interface IIconProps {
  iconName?: string;
  width?: number;
  height?: number;
  left?: boolean;
  right?: boolean;
}

withDefaults(defineProps<IIconProps>(), {
  width: 24,
  height: 24,
});
</script>

<template>
<svg
  class="rpd-icon"
  :class="[iconName, { 'rpd-icon_left': left }, { 'rpd-icon_right': right }]"
  :width="width"
  :height="height"
>
  <use
    v-bind="{ 'xlink:href': require('@/assets/sprite.svg') + `#${iconName}` }"
  >
  </use>
</svg>
</template>

<style scoped lang="scss">
.rpd-icon {
  display: block;
}

.rpd-icon_left {
  margin-right: .5rem;
}

.rpd-icon_right {
  margin-left: .5rem;
}
</style>
