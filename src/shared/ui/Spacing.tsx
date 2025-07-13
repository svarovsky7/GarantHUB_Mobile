import React from 'react';
import { View } from 'react-native';

export function WhiteSpace({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const heights: Record<string, number> = { sm: 8, md: 16, lg: 24, xl: 32 };
  return <View style={{ height: heights[size] ?? heights.md }} />;
}

export function WingBlank({ children }: { children: React.ReactNode }) {
  return <View style={{ paddingHorizontal: 15 }}>{children}</View>;
}
