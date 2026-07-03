export default interface InputFieldProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  icon?:
    | 'search'
    | 'type'
    | 'image'
    | 'initial'
    | 'folder'
    | 'link'
    | 'hash'
    | 'calendar';
  type?: 'text' | 'number' | 'url' | 'date';
  multiline?: boolean;
  rows?: number;
  onChange?: (value: any) => void;
}
