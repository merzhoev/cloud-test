import { DropdownOption } from './dropdown.types';
import { RefObject, forwardRef } from 'react';
import { useClickOutside } from '@/shared/hooks/use-click-outside';

import styles from './dropdown.module.scss';

interface DropdownListProps {
  options: DropdownOption[];
  onSelectOption: (option: DropdownOption) => void;
  onClose: () => void;
}

export const DropdownList = forwardRef<HTMLElement, DropdownListProps>(
  ({ options, onSelectOption, onClose }, ref) => {
    useClickOutside(ref as RefObject<HTMLElement>, onClose);

    return (
      <ul className={styles.dropdownList}>
        {options.map((option) => (
          <li
            id={`field-sex-option-${option.value}`}
            key={option.id}
            onClick={() => onSelectOption(option)}
            className={styles.dropdownListItem}>
            <span className={styles.dropdownListItemLabel}>{option.label}</span>
          </li>
        ))}
      </ul>
    );
  },
);
