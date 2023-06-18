import { useEffect, useRef } from 'react';

export const useIsMounted = (): React.MutableRefObject<boolean> => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
};
