import type { Room, Booking, CheckResult } from './types.ts';

export function validateTimes(start: number | null, end: number | null, currentTime: number): string[] {
  if (start === null || end === null) return ['Please enter both start and end times.'];
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > 1440)
    return ['Times must be whole minutes within the demo day.'];
  if (start >= end) return ['End time must be after start time.'];
  // Practice 07 T02 explicitly rejects equality with the simulated clock.
  if (start <= currentTime) return ['Start time must be after the current time.'];
  if (end - start > 120) return ['Maximum duration is 120 minutes.'];
  return [];
}

export function checkAvailability(room: Room | null, start: number | null, end: number | null,
  currentTime: number, bookings: readonly Booking[]): CheckResult {
  const reasons = validateTimes(start, end, currentTime);
  if (reasons.length) return {decision: 'unavailable', reasons};
  if (!room) return {decision: 'unavailable', reasons: ['Please select a room.']};
  if (room.isBlocked) return {decision: 'unavailable', reasons: ['Room is blocked for maintenance.']};
  if (bookings.some(booking => start! < booking.end && end! > booking.start))
    return {decision: 'unavailable', reasons: ['Conflicts with an existing booking.']};
  return {decision: 'available', reasons: ['The requested interval is free.']};
}

// Keep the reconstructed preview entry point without a second validation block.
export const preview = checkAvailability;
