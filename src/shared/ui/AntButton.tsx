import React from 'react';
import { Button as AntButton, ButtonProps } from '@ant-design/react-native';

interface Props extends ButtonProps {
  children: React.ReactNode;
}

export function Button({ children, ...props }: Props) {
  return <AntButton {...props}>{children}</AntButton>;
}