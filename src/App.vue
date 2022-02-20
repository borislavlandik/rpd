<script setup lang="ts">
import { ref } from 'vue';
import RpdButton from '@/common/components/button/rpd-button.vue';
import RpdIcon from '@/common/components/icon/rpd-icon.vue';
import RpdInput from '@/common/components/form/input/rpd-input.vue';
import RpdSelect from '@/common/components/form/select/rpd-select.vue';
import { required, minLength } from '@/common/validation';
import useValidation from '@/common/composables/useValidation';

const formState = ref({
  value: '',
  password: '',
  select: ['1'] as string[],
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
      required
      icon="arrow-down"
    >
      <template v-slot:default>
        Значение
      </template>
      <template v-slot:hint>
        {{ errors.value[0] }}
      </template>
    </rpd-input>
    <rpd-select
      v-model="formState.select"
      mode="single"
      :options="[
        {
          value: '1',
          label: 'Вычислительной математики и оптимизации',
        },
        {
          value: '2',
          label: 'Алгебраических и информационных систем',
        },
        {
          value: '3',
          label: 'Информационных технологий',
        },
        {
          value: '4',
          label: 'Математического анализа и дифференциальных уравнений',
        },
        {
          value: '5',
          label: 'Теории вероятностей и дискретной математики'
        }
      ]"
    >
      <template v-slot:default>
        Кафедра
      </template>
      <template v-slot:hint>
        Подсказка для селекта
      </template>
    </rpd-select>
    <rpd-input
      v-model="formState.password"
      placeholder="Текст-пароль"
      required
    >
      <template v-slot:default>
        Пароль
      </template>
      <template v-slot:hint>
        {{ errors.password[0] }}
      </template>
    </rpd-input>
    <div>
      is form valid: {{ valid }}
      <br>
      is form invalid: {{ invalid }}
      <pre>
        <p v-for="(value, key) of errors" :key="key">{{ key }} : {{ value }}</p>
      </pre>
      Select value: {{ formState.select }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  padding: 2rem;
}
</style>
