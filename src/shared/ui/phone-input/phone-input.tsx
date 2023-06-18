import { useLayoutEffect, useState, forwardRef } from 'react';
import { TextFieldProps, TextField } from '@/shared/ui';
import { formatPhoneNumber } from './phone-input.helpers';
import { PHONE_NUMBER_LENGTH, PHONE_NUMBER_LENGTH_WITH_CODE } from './phone-input.constants';

interface PhoneInputProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
  value: string;
  onChange: (phone: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        onChange(value.slice(0, -1));
        return;
      }

      const isPressedKeyNumber = e.key.replace(/[^0-9]/g, '').length;
      if (!isPressedKeyNumber) {
        return;
      }

      const newValue = value + e.key;
      if (newValue.length > PHONE_NUMBER_LENGTH) {
        return;
      }

      onChange?.(newValue);
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      const clipboardData = e.clipboardData;

      const pastedValue = clipboardData.getData('Text').replace(/[^0-9]/g, '');
      const newValue =
        pastedValue.length === PHONE_NUMBER_LENGTH_WITH_CODE ? pastedValue.slice(1) : pastedValue;
      onChange?.(newValue);
    };

    useLayoutEffect(() => {
      const formattedValue = formatPhoneNumber(value);
      setPhoneNumber(formattedValue);
    }, [value]);

    return (
      <TextField
        {...props}
        ref={ref}
        value={phoneNumber}
        onChange={() => {}}
        onPaste={onPaste}
        onKeyDown={onKeyDown}
      />
    );
  },
);
