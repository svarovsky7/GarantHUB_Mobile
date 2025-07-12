import React from 'react';
import { InputItem, InputItemProps } from '@ant-design/react-native';

interface Props extends InputItemProps {
  label?: string;
  secureTextEntry?: boolean;
}

export function TextInput({ label, secureTextEntry, ...props }: Props) {
  return (
    <InputItem
      {...props}
      type={secureTextEntry ? 'password' : props.type}
      placeholder={label}
    >
      {label}
    </InputItem>
  );
}