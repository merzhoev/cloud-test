import { isDefined } from '@/shared/helpers/is-defined';
import { ReactComponent as IconCheck } from '@/assets/check.svg';

import styles from './checkbox.module.scss';
import { forwardRef } from 'react';

interface CheckboxProps
  extends Omit<Props<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...props }, ref) => {
  return (
    <label htmlFor={props.id} className={styles.container}>
      <input {...props} ref={ref} type="checkbox" />
      <span className={styles.checkmark}>
        <IconCheck className={styles.checkmarkIcon} />
      </span>
      {isDefined(label) && <span className={styles.label}>{label}</span>}
    </label>
  );
});
