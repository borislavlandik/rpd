<script setup lang="ts">
interface IPreloaderProps {
  isLoading: boolean;
}

withDefaults(defineProps<IPreloaderProps>(), {
  isLoading: true,
});
</script>

<template>
  <div>
    <div class="rpd-preloader" v-if="isLoading">
      <div class="spinner-box">
        <div class="pulse-container">
          <div class="pulse-bubble pulse-bubble-1"></div>
          <div class="pulse-bubble pulse-bubble-2"></div>
          <div class="pulse-bubble pulse-bubble-3"></div>
        </div>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped lang="scss">
@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: .25;
    transform: scale(.75);
  }
}
.rpd-preloader {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
}

.pulse-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 120px;
}

.pulse-bubble {
  width: 20px;
  height: 20px;

  border-radius: 50%;
  background-color: var(--main-colors-black);
}

.pulse-bubble-1 {
    animation: pulse .4s ease 0s infinite alternate;
}
.pulse-bubble-2 {
    animation: pulse .4s ease .2s infinite alternate;
}
.pulse-bubble-3 {
    animation: pulse .4s ease .4s infinite alternate;
}
</style>
