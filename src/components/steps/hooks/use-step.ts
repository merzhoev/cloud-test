import { formActions } from '@/store/slices/form-slice';
import { useDispatch } from 'react-redux';

const MIN_STEP = 0;
const MAX_STEP = 3;

interface UseStepProps {
  currentStep: number;
  onPrev?(): void;
  onNext?(): void;
}

export const useStep = ({ currentStep, onPrev, onNext }: UseStepProps) => {
  const dispatch = useDispatch();

  const onPrevStep = () => {
    const prevStep = Math.max(MIN_STEP, currentStep - 1);
    dispatch(formActions.setStep(prevStep));
    onPrev?.();
  };

  const onNextStep = () => {
    const nextStep = Math.min(MAX_STEP, currentStep + 1);
    dispatch(formActions.setStep(nextStep));
    onNext?.();
  };

  return { onPrevStep, onNextStep };
};
