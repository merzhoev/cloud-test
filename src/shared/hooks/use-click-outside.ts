import { RefObject, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const el = ref?.current;

      if (!el || el.contains(e.target as Node)) {
        return;
      }

      handler();
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
}
