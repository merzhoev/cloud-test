import { useEffect, useState } from 'react';
import { useIsMounted } from './use-is-mounted';

type UseDisclosureOutput = [
  boolean,
  {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  },
];

export const useDisclosure = (
  initialValue: boolean,
  callbacks: {
    onOpen: () => void;
    onClose: () => void;
  } = { onOpen: () => {}, onClose: () => {} },
): UseDisclosureOutput => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const isMountedRef = useIsMounted();

  useEffect(() => {
    if (!isMountedRef.current) {
      return;
    }

    if (isOpen) {
      callbacks.onOpen();
    }

    if (!isOpen) {
      callbacks.onClose();
    }
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((is) => !is);

  return [isOpen, { open, close, toggle }];
};
