import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Stepper } from '@/shared/ui';
import { getStepComponent } from '@/components/steps';
import { routes } from '@/routes';

import styles from './create-page.module.scss';

export function CreatePage() {
  const navigate = useNavigate();
  const { step, maxCompletedStep } = useAppSelector((state) => state.form);
  const Step = getStepComponent(step);

  useEffect(() => {
    if (step === 0) {
      navigate(routes.home);
    }
  }, [step, navigate]);

  return (
    <div className={styles.createPage}>
      <div className={styles.createPageContainer}>
        <Stepper step={step} maxCompletedStep={maxCompletedStep} totalSteps={3} />

        <Step />
      </div>
    </div>
  );
}
