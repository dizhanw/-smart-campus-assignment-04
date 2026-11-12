export interface Booking { readonly id: string; readonly start: number; readonly end: number }
export interface Room {
  readonly id: string;
  readonly name: string;
  readonly capacity: number;
  readonly equipment: readonly string[];
  readonly isBlocked: boolean;
  readonly bookings: readonly Booking[];
}
export interface CheckResult {
  decision: 'available' | 'unavailable';
  reasons: string[];
}
