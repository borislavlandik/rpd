<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import RpdIcon from '@/common/components/icon/rpd-icon.vue';

interface IBreadcrumb {
  label: string;
  route: string;
  name: string | symbol | undefined;
  isActive: boolean;
}

const route = useRoute();
const mainBreadcrumb = computed<IBreadcrumb>(() => ({
  label: 'Главная',
  route: '/',
  name: 'home',
  isActive: route.path === '/',
}));

const breadcrumbs = computed(() => (
  [
    ...(route.name === 'home' ? [] : [mainBreadcrumb.value]),
    ...route.matched.map((p) => ({
      label: p.meta.breadcrumbs,
      route: p.path,
      name: p.name,
      isActive: p.name === route.name,
    })),
  ]
));

</script>

<template>
  <div class="breadcrumbs">
    <router-link
      class="breadcrumb"
      v-for="breadcrumb in breadcrumbs"
      :key="breadcrumb.route"
      :to="{ name: breadcrumb.name, params: route.params }"
      :class="{ 'breadcrumb_active': breadcrumb.isActive }"
    >
      <span class="breadcrumb__label"> {{ breadcrumb.label }}</span>
      <rpd-icon
        v-if="!breadcrumb.isActive"
        class="breadcrumb__icon"
        icon-name="arrow-right"
      ></rpd-icon>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.breadcrumbs {
  width: 100%;
  height: 1.5rem;

  display: flex;
  gap: .5rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: .5rem;

  color: var(--main-colors-black);
  line-height: 1.5rem;
  text-decoration: none;

  &:not(.breadcrumb_active):hover .breadcrumb__label {
    color: var(--main-colors-accent);
  }
}

.breadcrumb_active {
  font-weight: 700;
}
</style>
