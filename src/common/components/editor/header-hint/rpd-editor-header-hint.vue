<template>
  <div class="editor-header">
    <slot></slot>
    <slot name="button"></slot>
  </div>
</template>

<style scoped lang="scss">
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-bottom: 2rem;
}
</style>
