import { useRef } from 'react';
import classNames from 'classnames';
import { DropdownList } from './dropdown-list';
import { ReactComponent as IconArrowDown } from '@/assets/arrow-down.svg';
import { isDefined } from '@/shared/helpers/is-defined';
import { DropdownOption } from './dropdown.types';
import { useDisclosure } from '@/shared/hooks/use-disclosure';

import styles from './dropdown.module.scss';

interface DropdownProps {
  options: DropdownOption[];
  selectedOption: DropdownOption | null;
  onChange: (option: DropdownOption) => void;
  placeholder?: string;
  isError?: boolean;
  label?: string;
  helperText?: string;
}

export function Dropdown({
  options,
  selectedOption,
  onChange,
  label,
  helperText,
  placeholder = 'Не выбрано',
  isError = false,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, { close, toggle }] = useDisclosure(false);

  const onSelectOption = (option: DropdownOption) => {
    onChange?.(option);
    close();
  };

  return (
    <div className={classNames(styles.dropdownWrapper, isError && styles.dropdownWrapperError)}>
      {isDefined(label) && <p className={styles.dropdownWrapperLabel}>{label}</p>}
      <div ref={dropdownRef} className={styles.dropdownContainer}>
        <div
          id="field-sex"
          className={classNames(styles.dropdown, {
            [styles.dropdownSelected]: selectedOption !== null,
          })}
          onClick={toggle}>
          <span className={styles.dropdownLabel}>
            {selectedOption !== null ? selectedOption.label : placeholder}
          </span>
          <IconArrowDown className={classNames(isOpen && styles.dropdownIconRotated)} />
        </div>
        {isOpen && (
          <DropdownList
            ref={dropdownRef}
            options={options}
            onSelectOption={onSelectOption}
            onClose={close}
          />
        )}
      </div>
      {isDefined(helperText) && <p className={styles.dropdownWrapperHelperText}>{helperText}</p>}
    </div>
  );
}
