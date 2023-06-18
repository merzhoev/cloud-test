import classNames from 'classnames';

import styles from './stepper.module.scss';

interface StepperProps {
  step: number;
  maxCompletedStep: number;
  totalSteps: number;
}

export function Stepper({ step, maxCompletedStep, totalSteps }: StepperProps) {
  const steps = Array.from({ length: totalSteps }, (_, idx) => {
    const currentStep = idx + 1;

    return (
      <div
        key={idx}
        className={classNames(styles.step, {
          [styles[`step--uncompleted`]]: step < currentStep,
          [styles[`step--process`]]: step === currentStep,
          [styles[`step--completed`]]: step > currentStep || maxCompletedStep >= currentStep,
        })}>
        <span className={styles.stepNumber}>{currentStep}</span>
      </div>
    );
  });
  const progressWidth = ((step - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={styles.stepper}>
      <div className={styles.progress} style={{ width: `${progressWidth}%` }} />
      <div className={styles.steps}>{steps}</div>
    </div>
  );
}
