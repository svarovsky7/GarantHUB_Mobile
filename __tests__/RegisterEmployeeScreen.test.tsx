import React from 'react';
import { render } from '@testing-library/react-native';
import { RegisterEmployeeScreen } from '../screens/RegisterEmployeeScreen';

const navigation = { goBack: jest.fn() } as any;

test('renders register screen', () => {
  const { getByText } = render(<RegisterEmployeeScreen navigation={navigation} route={{ key: 'Register', name: 'Register' }} />);
  expect(getByText('Создать сотрудника')).toBeTruthy();
});
