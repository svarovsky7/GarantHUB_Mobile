import { Provider } from '@ant-design/react-native';
import { AppNavigator } from './app/navigation';

export default function App() {
  return (
    <Provider>
      <AppNavigator />
    </Provider>
  );
}
