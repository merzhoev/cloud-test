import { ProfilePage } from '@/pages';
import { FirstStep } from './ui/first-step';
import { SecondStep } from './ui/second-step';
import { ThirdStep } from './ui/third-step';

const STEPS_COMPONENTS = [ProfilePage, FirstStep, SecondStep, ThirdStep];

export const getStepComponent = (step: number) => {
  return STEPS_COMPONENTS[step];
};
