import type { Room } from './types.ts';
import { CURRENT_TIME } from './data.ts';
import { filterRooms } from './filtering.ts';
import { checkAvailability } from './validation.ts';

export function searchRooms(rooms: readonly Room[], attendees: number, equipment: readonly string[],
  selectedId: string | null, start: number | null, end: number | null) {
  const matches = filterRooms(rooms, attendees, equipment);
  const selected = matches.find(room => room.id === selectedId) ?? matches[0] ?? null;
  return { rooms: matches, selectedId: selected?.id ?? null,
    result: selected ? checkAvailability(selected, start, end, CURRENT_TIME, selected.bookings) : null,
    emptyMessage: matches.length ? '' : 'No rooms match your requirements.' };
}
