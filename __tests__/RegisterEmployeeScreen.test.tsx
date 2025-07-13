import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RegisterEmployeeScreen } from '../src/screens/RegisterEmployeeScreen';

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

const navigation = { goBack: jest.fn() } as any;

test('renders register screen', () => {
  const { getByText } = render(
    <PaperProvider>
      <RegisterEmployeeScreen navigation={navigation} route={{ key: 'Register', name: 'Register' }} />
    </PaperProvider>
  );
  expect(getByText('Создать сотрудника')).toBeTruthy();
});
