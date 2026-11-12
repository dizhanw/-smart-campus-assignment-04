import type { Room } from './types.ts';
export function filterRooms(rooms: readonly Room[], attendees: number, equipment: readonly string[]): readonly Room[] {
  if (!Number.isInteger(attendees) || attendees < 1) throw new Error('Attendees must be a positive integer.');
  return rooms.filter(room => room.capacity >= attendees && equipment.every(item => room.equipment.includes(item)));
}
