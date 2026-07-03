export default interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string;
  icon?: 'search' | 'type' | 'image';
  onChange?: (value: string) => void;
}
