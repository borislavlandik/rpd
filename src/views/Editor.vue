<script setup lang="ts">
import RpdEditorMenu from '@/common/components/editor/menu/rpd-editor-menu.vue';
</script>

<template>
  <div class="editor">
    <div class="editor__content">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </div>
    <div class="editor__menu">
      <rpd-editor-menu></rpd-editor-menu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.editor {
  display: flex;
  gap: 1.5rem;
}

.editor__content {
  flex: 1;
}
</style>
