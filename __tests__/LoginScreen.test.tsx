import React from 'react';
import { render } from '@testing-library/react-native';
import { LoginScreen } from '../screens/LoginScreen';

const navigation = { navigate: jest.fn() } as any;

test('renders login screen', () => {
  const { getByText } = render(<LoginScreen navigation={navigation} route={{ key: 'Login', name: 'Login' }} />);
  expect(getByText('Войти')).toBeTruthy();
});
