import React from 'react';
import { Platform } from 'react-native';
import { InputItem, InputItemProps } from '@ant-design/react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

interface Props extends InputItemProps {
  label?: string;
  secureTextEntry?: boolean;
}

export function TextInput({ label, secureTextEntry, ...props }: Props) {
  if (Platform.OS === 'web') {
    return (
      <PaperTextInput
        mode="outlined"
        label={label}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChange}
        secureTextEntry={secureTextEntry}
        style={{ marginBottom: 8 }}
      />
    );
  }

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