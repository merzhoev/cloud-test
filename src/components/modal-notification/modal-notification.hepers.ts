import { ReactComponent as IconSuccess } from '@/assets/success.svg';
import { ReactComponent as IconFailed } from '@/assets/failed.svg';
import { FormResponseStatus } from '@/api';

export const getIconByStatus = (status: FormResponseStatus) => {
  switch (status) {
    case FormResponseStatus.SUCCESS:
      return IconSuccess;
    case FormResponseStatus.FAILED:
      return IconFailed;
  }
};
