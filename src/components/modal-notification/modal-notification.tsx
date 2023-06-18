import { PropsWithChildren } from 'react';
import classNames from 'classnames';
import { FormResponseStatus } from '@/api';
import { Modal, ModalProps } from '@/shared/ui';
import { getIconByStatus } from './modal-notification.hepers';

import styles from './modal-notification.module.scss';

interface ModaInfoProps extends ModalProps {
  status: FormResponseStatus;
  title: string;
}

export function ModalNotification({
  title,
  status,
  children,
  ...props
}: PropsWithChildren<ModaInfoProps>) {
  const IconStatus = getIconByStatus(status);

  return (
    <Modal {...props}>
      <div className={classNames(styles.modalInfo, styles[`modalInfo--${status}`])}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>
          <div className={styles.statusIndicator}>
            <IconStatus />
          </div>
        </div>
        <div className={styles.actions}>{children}</div>
      </div>
    </Modal>
  );
}
