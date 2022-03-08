import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

export function formatISODateTime(date: string): string {
  return format(parseISO(date), 'dd MMMM yyyy HH:mm', { locale: ru });
}
