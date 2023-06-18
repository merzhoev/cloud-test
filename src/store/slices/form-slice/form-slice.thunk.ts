import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store/redux';
import { FormResponseFailed, FormResponseStatus, sendForm } from '@/api';
import { mapFieldsStateToFormFields } from './form-slice.mapper';

export const sendFormFields = createAsyncThunk(
  'form/sendFormFields',
  async (_, { getState, rejectWithValue }) => {
    const formFieldsState = (getState() as RootState).form.fields;
    const formFields = mapFieldsStateToFormFields(formFieldsState);

    try {
      const response = await sendForm(formFields);

      return response.data;
    } catch (err) {
      const error = err as AxiosError<FormResponseFailed>;
      const errorData = error.response?.data ?? {
        status: FormResponseStatus.FAILED,
        message: 'Ошибка',
      };

      return rejectWithValue(errorData);
    }
  },
);
