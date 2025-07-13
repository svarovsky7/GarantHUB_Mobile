import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';
import { Provider as PaperProvider } from 'react-native-paper';

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

test('renders correctly', async () => {
  await ReactTestRenderer.act(async () => {
    ReactTestRenderer.create(
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  });
});
