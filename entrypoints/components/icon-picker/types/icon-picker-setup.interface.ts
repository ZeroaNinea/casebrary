import { IconName } from '@/utils/icons';

export default interface IconPickerSetup {
  icon: IconName;
  setIcon: (icon: IconName) => void;
  iconMode: 'lucide' | 'url' | 'upload';
  setIconMode: (mode: 'lucide' | 'url' | 'upload') => void;
  iconUrl: string;
  setIconUrl: (url: string) => void;
}
