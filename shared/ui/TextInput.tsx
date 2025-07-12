import { TextInput as PaperTextInput, TextInputProps } from 'react-native-paper';

export function TextInput(props: TextInputProps) {
  return <PaperTextInput mode="outlined" {...props} />;
}
