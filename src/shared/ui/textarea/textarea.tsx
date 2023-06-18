import { CSSProperties, forwardRef } from 'react';
import classNames from 'classnames';
import { isDefined } from '@/shared/helpers/is-defined';
import { getClearCharsCount } from './textarea.helpers';

import styles from './textarea.module.scss';

interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  helperText?: string;
  isError?: boolean;
  isShownCount?: boolean;
  resize?: CSSProperties['resize'];
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, isError, isShownCount = false, resize = 'vertical', ...props }, ref) => {
    const clearCharsCount = getClearCharsCount(props.value);

    return (
      <div className={classNames(styles.container, isError && styles.error)}>
        {isDefined(label) && <p className={styles.label}>{label}</p>}
        <textarea {...props} ref={ref} className={styles.textarea} style={{ resize }} />
        {isShownCount && Boolean(clearCharsCount) && (
          <p className={styles.count}>{clearCharsCount}</p>
        )}
        {isDefined(helperText) && <p className={styles.helperText}>{helperText}</p>}
      </div>
    );
  },
);
