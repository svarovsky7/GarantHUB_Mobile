import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { LoginScreen } from '../src/screens/LoginScreen';

jest.mock('../src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getUser: jest.fn(() => ({ user: null })),
    },
    from: jest.fn(() => ({ select: jest.fn() })),
  },
}));

const navigation = { navigate: jest.fn() } as any;

test('renders login screen', () => {
  const { getByText } = render(
    <PaperProvider>
      <LoginScreen navigation={navigation} route={{ key: 'Login', name: 'Login' }} />
    </PaperProvider>
  );
  expect(getByText('Войти')).toBeTruthy();
});
