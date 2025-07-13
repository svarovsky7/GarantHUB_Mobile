import React from 'react';
import { Platform } from 'react-native';
import { Button as AntButton, ButtonProps } from '@ant-design/react-native';
import { Button as PaperButton } from 'react-native-paper';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

export function Button({ children, ...props }: Props) {
  if (Platform.OS === 'web') {
    return (
      <PaperButton
        mode={props.type === 'primary' ? 'contained' : 'outlined'}
        onPress={props.onPress}
        disabled={props.disabled}
        style={{ marginVertical: 4 }}
      >
        {children}
      </PaperButton>
    );
  }

  return <AntButton {...props}>{children}</AntButton>;
}