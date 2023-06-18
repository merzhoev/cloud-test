import { FormFields } from '@/api';
import { FormStateFields } from './form-slice';

export const mapFieldsStateToFormFields = (fieldsState: FormStateFields) => {
  return fieldsState.reduce((acc, fields, idx) => {
    type Key = keyof FormStateFields[typeof idx];
    for (const key in fields) {
      acc[key as Key] = fields[key as Key];
    }

    return acc;
  }, {}) as FormFields;
};
