import { TextInput } from '@mantine/core';
import { forwardRef } from 'react';

interface CustomPhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: React.ReactNode;
  [key: string]: any;
}
export const Custom_Phone_Input = forwardRef<
  HTMLInputElement,
  CustomPhoneInputProps
>(({ value, onChange, label, ...props }, ref) => (
  <TextInput
    label={label}
    ref={ref}
    value={value}
    onChange={(event) => onChange?.(event.target.value)}
    size='sm'
    w='100%'
    classNames={{
      input: 'placeholder:!text-sm !text-primary !font-medium',
      label: '!w-full',
    }}
    {...props}
  />
));

Custom_Phone_Input.displayName = 'Custom_Phone_Input';
