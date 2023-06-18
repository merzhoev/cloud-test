import { isDefined } from '@/shared/helpers/is-defined';
import { forwardRef } from 'react';

import styles from './radio.module.scss';

interface RadioProps
  extends Omit<Props<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'radio'> {
  label?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, ...props }, ref) => {
  return (
    <label htmlFor={props.id} className={styles.container}>
      <input {...props} type="radio" ref={ref} />
      <span className={styles.checkmark}></span>
      {isDefined(label) && <span className={styles.label}>{label}</span>}
    </label>
  );
});
