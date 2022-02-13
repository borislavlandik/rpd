<script setup lang="ts">
import { ref } from 'vue';
import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import RpdInput from '@/common/components/form/input/rpd-input.vue';
import { required, minLength } from './common/validation';
import useValidation from './common/composables/useValidation';

const formState = ref({
  value: '',
  password: '',
});

const { valid, invalid, errors } = useValidation(formState, {
  value: [required, minLength(5)],
  password: [required],
});
</script>

<template>
  <div class="container">
    <rpd-button appearance="outline">
      Переключить поле
      <rpd-icon right iconName="ui-circle-check"></rpd-icon>
    </rpd-button>
    <rpd-input
      v-model="formState.value"
      placeholder="Текст-подсказка"
    >
      <template v-slot:default>
        Значение
      </template>
      <template v-slot:hint>
        {{ errors.value[0] }}
      </template>
    </rpd-input>
    <rpd-input
      v-model="formState.password"
      placeholder="Текст-пароль"
    >
      <template v-slot:default>
        Пароль
      </template>
      <template v-slot:hint>
        {{ errors.password[0] }}
      </template>
    </rpd-input>
    <br>
    is form valid: {{ valid }}
    <br>
    is form invalid: {{ invalid }}
    <pre>
      <p v-for="(value, key) of errors" :key="key">{{ key }} : {{ value }}</p>
    </pre>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
}
</style>
