export default interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: 'search' | 'type' | 'image';
  type?: 'text' | 'number' | 'url';
  multiline?: boolean;
  rows?: number;
  onChange?: (value: string) => void;
}
