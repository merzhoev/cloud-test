import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as IconClose } from '@/assets/Close.svg';

import styles from './modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  withCloseButton?: boolean;
  onClose: () => void;
}

export function Modal({
  children,
  isOpen,
  withCloseButton,
  onClose,
}: PropsWithChildren<ModalProps>) {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {withCloseButton && (
            <button className={styles.button} onClick={onClose}>
              <IconClose />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
