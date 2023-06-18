import { forwardRef } from 'react';
import classNames from 'classnames';
import { isDefined } from '@/shared/helpers/is-defined';

import styles from './text-field.module.scss';

export interface TextFieldProps
  extends Omit<Props<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> {
  size?: 'md';
  label?: string;
  helperText?: string;
  isError?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ size = 'md', type = 'text', isError = false, helperText, label, ...props }, ref) => {
    return (
      <div
        className={classNames(styles.textField, styles[`textField-size--${size}`], {
          [styles[`textField--error`]]: isError,
        })}>
        {isDefined(label) && <p className={styles.textFieldLabel}>{label}</p>}
        <input {...props} type={type} ref={ref} />
        {isDefined(helperText) && <p className={styles.textFieldHelperText}>{helperText}</p>}
      </div>
    );
  },
);
