<script setup lang="ts">
import RpdButton from '@/common/components/button/rpd-button.vue';

import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="form__buttons">
    <rpd-button type="submit" appearance="fill">
      Сохранить
    </rpd-button>

    <rpd-button type="button" appearance="outline" @click="router.go(-1)">
      Отменить
    </rpd-button>
  </div>
</template>

<style scoped lang="scss">
.form__buttons {
  display: flex;
  gap: 1rem;

  margin-top: .5rem;
}
</style>
