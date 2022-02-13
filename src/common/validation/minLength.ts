import { IValidationFunction } from '../composables/useValidation';
import { required } from './required';

export function minLength(legnth: number): IValidationFunction {
  return (value) => ({
    valid: required(value).valid && value.toString().length >= legnth,
    errorMessage: `Минимальная длина: ${legnth}`,
  });
}
