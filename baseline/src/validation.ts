// Equivalent reconstruction from Practice 07; no original Bolt source was supplied.
export interface Booking { readonly id: string; readonly start: number; readonly end: number }
export interface Room { readonly id: string; readonly name: string; readonly isBlocked: boolean }
export interface CheckResult { decision: 'available' | 'unavailable'; reasons: string[] }

export function checkAvailability(room: Room | null, start: number | null, end: number | null,
  currentTime: number, bookings: readonly Booking[]): CheckResult {
  if (start === null || end === null) return {decision:'unavailable',reasons:['Please enter both start and end times.']};
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > 1440)
    return {decision:'unavailable',reasons:['Times must be whole minutes within the demo day.']};
  if (start >= end) return {decision:'unavailable',reasons:['End time must be after start time.']};
  if (start <= currentTime) return {decision:'unavailable',reasons:['Start time must be after the current time.']};
  if (end - start > 120) return {decision:'unavailable',reasons:['Maximum duration is 120 minutes.']};
  if (!room) return {decision:'unavailable',reasons:['Please select a room.']};
  if (room.isBlocked) return {decision:'unavailable',reasons:['Room is blocked for maintenance.']};
  if (bookings.some(booking => start < booking.end && end > booking.start))
    return {decision:'unavailable',reasons:['Conflicts with an existing booking.']};
  return {decision:'available',reasons:['The requested interval is free.']};
}

export function preview(room: Room | null, start: number | null, end: number | null,
  currentTime: number, bookings: readonly Booking[]): CheckResult {
  // A reconstructed duplicate to demonstrate extraction, not an observed Bolt defect.
  if (start === null || end === null) return {decision:'unavailable',reasons:['Please enter both start and end times.']};
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end > 1440)
    return {decision:'unavailable',reasons:['Times must be whole minutes within the demo day.']};
  if (start >= end) return {decision:'unavailable',reasons:['End time must be after start time.']};
  if (start <= currentTime) return {decision:'unavailable',reasons:['Start time must be after the current time.']};
  if (end - start > 120) return {decision:'unavailable',reasons:['Maximum duration is 120 minutes.']};
  return checkAvailability(room, start, end, currentTime, bookings);
}
