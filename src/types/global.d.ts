declare type Props<E extends HTMLAttributes<T>, T> = Omit<
  import('react').DetailedHTMLProps<E, T>,
  'ref'
>;

declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export { ReactComponent };
}
