<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';

const route = useRoute();
const canShowButton = computed(() => route.meta?.canShowAddButton ?? false);
</script>

<template>
  <header class="header">
    <router-link class="title-link" to="/">
      Генератор рабочих <br>
      программ дисциплин
    </router-link>

    <div class="right-menu">
      <router-link :to="{ name: 'create' }" custom v-slot="{ navigate }">
        <rpd-button v-if="canShowButton" appearance="fill" @click="navigate">
          Добавить РПД <rpd-icon icon-name="ui-circle-new" right></rpd-icon>
        </rpd-button>
      </router-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 3rem;
}

.title-link {
  color: var(--main-colors-black);
  font-size: var(--font-size-header-h4);
  font-weight: 800;
  text-decoration: none;

  &:hover {
    color: var(--main-colors-accent);
  }
}

.right-menu {
  display: flex;
  align-items: center;
}
</style>
