import classNames from 'classnames';
import { ReactComponent as IconTrash } from '@/assets/trash.svg';
import { TextField, TextFieldProps } from '..';

import styles from './advantage.module.scss';

interface AdvantageProps extends TextFieldProps {
  number: number;
  onRemove: () => void;
}

export function Advantage({ onRemove, number, ...props }: AdvantageProps) {
  return (
    <div className={classNames(styles.advantage, props.isError && styles.advantageError)}>
      <TextField {...props} id={`field-advantages-${number}`} />
      <IconTrash
        id={`button-remove-${number}`}
        onClick={onRemove}
        className={styles.advantageIcon}
      />
    </div>
  );
}
