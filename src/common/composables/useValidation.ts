import { MaybeRef } from '@vueuse/core';
import {
  watch,
  ref,
  unref,
  Ref,
  computed,
} from 'vue';

export interface IValidationFunctionReturn {
  valid: boolean;
  errorMessage: string;
}

export type IValidationFunction
  = (value: string | number) => IValidationFunctionReturn;

export type IValidationConfig<T> = {
  [K in keyof T]?: IValidationFunction[];
}

export type IValidationError<T = Record<string, unknown>> = {
  [K in keyof T]: string[];
}

export interface IValidationReturn<T> {
  validate: () => void;
  valid: Ref<boolean>;
  invalid: Ref<boolean>;
  errors: Ref<IValidationError<T>>;
}

function useValidation<T extends Record<string, string | number>>(
  formValue: MaybeRef<T>,
  config: IValidationConfig<T>,
): IValidationReturn<T> {
  const valid = ref(false);
  const invalid = computed(() => !valid.value);
  const errors = ref<IValidationError<T>>({} as IValidationError<T>);

  function resetErrors(): void {
    const model = unref(formValue);
    (Object.keys(model) as Array<keyof T>).forEach(
      (key) => { errors.value[key] = []; },
    );
  }

  function validate(): void {
    resetErrors();

    const model = unref(formValue);
    let hasErrors = false;

    (Object.keys(model) as Array<keyof T>).forEach(
      (key) => config[key]?.forEach((validationFunction) => {
        const result = validationFunction(model[key]);

        if (!result.valid) {
          hasErrors = true;
          (errors.value[key] = errors.value[key] || []).push(result.errorMessage);
        }
      }),
    );

    valid.value = !hasErrors;
  }

  watch(formValue, () => {
    validate();
  }, {
    deep: true,
    immediate: true,
  });

  return {
    validate,
    valid,
    invalid,
    errors: errors as Ref<IValidationError<T>>,
  };
}

export default useValidation;
