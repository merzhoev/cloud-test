import axios from '@/core/axios';
import { FormFields, FormResponseSuccess } from './dto/form.dto';

export const sendForm = (fields: FormFields) => {
  return axios.post<FormResponseSuccess>('/content/v1/bootcamp/frontend', fields);
};
