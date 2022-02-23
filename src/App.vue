<script setup lang="ts">
import RpdHeader from '@/common/components/header/rpd-header.vue';
import RpdBreadcrumbs from '@/common/components/breadcrumbs/rpd-breadcrumbs.vue';
</script>

<template>
  <div class="app">
    <div class="app__header-wrapper">
      <rpd-header class="app__header"></rpd-header>
    </div>

    <main class="app__main">
      <rpd-breadcrumbs class="app__breadcrumbs"></rpd-breadcrumbs>
      <div class="app__content">
        <router-view class="app__router" v-slot="{ Component, route }">
          <transition name="fade">
            <component :is="Component" :key="route.path"></component>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
$maxWidth: 1376px;

.app__header-wrapper {
  display: flex;
  align-items: center;
  width: 100%;

  padding: 12px 32px;

  box-shadow: inset 0 -2px 0 0 var(--main-colors-black);
}

.app__header {
  width: 100%;
  max-width: $maxWidth;

  margin: 0 auto;
}
.app__main {
  width: 100%;
  max-width: $maxWidth;

  margin: 0 auto;
}

.app__content {
  position: relative;
}

.app__router {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.app__breadcrumbs {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: .2s;
  transition-timing-function: ease-in-out;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
