import { HIGHLIGHTS } from '../utils/constants';
import { ICON_MAP } from './icons';

export function HighlightIcon({ name, size = 28 }) {
  const Icon = ICON_MAP[name];
  return Icon ? <Icon size={size} /> : null;
}

export { HIGHLIGHTS };
