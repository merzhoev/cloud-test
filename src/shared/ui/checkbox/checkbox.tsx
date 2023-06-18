import { isDefined } from '@/shared/helpers/is-defined';
import { ReactComponent as IconCheck } from '@/assets/check.svg';

import styles from './checkbox.module.scss';

interface CheckboxProps
  extends Omit<Props<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> {
  label?: string;
}

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label htmlFor={props.id} className={styles.container}>
      <input {...props} type="checkbox" />
      <span className={styles.checkmark}>
        <IconCheck className={styles.checkmarkIcon} />
      </span>
      {isDefined(label) && <span className={styles.label}>{label}</span>}
    </label>
  );
}
