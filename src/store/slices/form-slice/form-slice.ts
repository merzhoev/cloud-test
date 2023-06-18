import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux';
import { FormResponse, FormResponseFailed, FormResponseSuccess } from '@/api';
import {
  FirstStepFields,
  ThirdStepFields,
  SecondStepFields,
  ZeroStepFields,
} from '@/components/steps';
import { sendFormFields } from './form-slice.thunk';

export type FormStateFields = [ZeroStepFields, FirstStepFields, SecondStepFields, ThirdStepFields];

interface FormState {
  fields: FormStateFields;
  step: number;
  maxCompletedStep: number;
  isLoading: boolean;
  response: FormResponse | null;
}

const initialState: FormState = {
  fields: [
    {
      email: 'arbimerzhoev@gmail.com',
      phone: '9888051405',
    },
    {
      nickname: '',
      name: '',
      sername: '',
      sex: undefined,
    },
    {
      advantages: [''],
      checkbox: [],
      radio: 1,
    },
    {
      about: '',
    },
  ],
  step: 0,
  maxCompletedStep: 0,
  isLoading: false,
  response: null,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFields: (state, action: PayloadAction<FormStateFields[number]>) => {
      state.fields[state.step] = action.payload;
      state.maxCompletedStep = Math.max(state.maxCompletedStep, state.step);
    },
    clearFields: () => initialState,
    setStep: (state, { payload }: PayloadAction<number>) => {
      state.step = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendFormFields.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      sendFormFields.fulfilled,
      (state, action: PayloadAction<FormResponseSuccess>) => {
        state.isLoading = false;
        state.response = action.payload;
      },
    );
    builder.addCase(sendFormFields.rejected, (state, action) => {
      state.isLoading = false;
      state.response = action.payload as FormResponseFailed;
    });
  },
});

export const selectFields = <T extends number>(step: number) => {
  return (state: RootState): FormStateFields[T] => state.form.fields[step];
};

export const { actions: formActions, reducer: formReducer } = formSlice;
