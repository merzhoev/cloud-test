import {
  FirstStepFields,
  SecondStepFields,
  ThirdStepFields,
  ZeroStepFields,
} from '@/components/steps';

export enum FormResponseStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export interface FormResponseSuccess {
  status: FormResponseStatus.SUCCESS;
  message: string;
}

export interface FormResponseFailed {
  status: FormResponseStatus.FAILED;
  message: string;
}

export type FormResponse = FormResponseSuccess | FormResponseFailed;
export type FormFields = ZeroStepFields & FirstStepFields & SecondStepFields & ThirdStepFields;
