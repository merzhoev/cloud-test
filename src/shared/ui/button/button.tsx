import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { isDefined } from '@/shared/helpers/is-defined';

import styles from './button.module.scss';

interface ButtonProps
  extends Omit<
    Props<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'disabled'
  > {
  variant?: 'contained' | 'outlined';
  size?: 'md';
  color?: 'primary';
  isLoading?: boolean;
  isDisabled?: boolean;
  IconLeft?: JSX.Element;
  IconRight?: JSX.Element;
}

export function Button({
  variant = 'contained',
  size = 'md',
  color = 'primary',
  isLoading = false,
  isDisabled = false,
  IconLeft,
  IconRight,
  children,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...props}
      disabled={isLoading || isDisabled}
      className={classNames(
        className,
        styles.button,
        styles[`button-variant--${variant}`],
        styles[`button-size--${size}`],
        styles[`button-color--${color}`],
      )}>
      {isDefined(IconLeft) && IconLeft}
      {isLoading ? 'Загрузка...' : children}
      {isDefined(IconLeft) && IconRight}
    </button>
  );
}
