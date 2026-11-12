import type { Room } from './types.ts';
export const CURRENT_TIME = 540;
// Fictional extensions. Only room names, clock and fixture derive from the reports.
export const ROOMS: readonly Room[] = Object.freeze([
  { id: 'R101', name: 'Innovation Lab', capacity: 4, equipment: ['Whiteboard'], isBlocked: false,
    bookings: [{id: 'B1', start: 600, end: 660}] },
  { id: 'R102', name: 'Seminar Room', capacity: 12, equipment: ['Whiteboard', 'Projector'], isBlocked: false,
    bookings: [{id: 'B2', start: 660, end: 720}] },
  { id: 'R103', name: 'Computer Lab', capacity: 24, equipment: ['Projector', 'Computers'], isBlocked: false,
    bookings: [{id: 'B3', start: 840, end: 900}] },
  { id: 'R104', name: 'Project Room A', capacity: 8, equipment: ['Whiteboard', 'Projector'], isBlocked: true,
    bookings: [] },
].map(room => Object.freeze({...room, equipment: Object.freeze(room.equipment),
  bookings: Object.freeze(room.bookings.map(booking => Object.freeze(booking)))})));
