import { IValidationFunction } from '../composables/useValidation';

export const required: IValidationFunction = (value) => ({
  valid: value !== undefined && value !== null && value !== '',
  errorMessage: 'Это поле необходимо заполнить',
});
