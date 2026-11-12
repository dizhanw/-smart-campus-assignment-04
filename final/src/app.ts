import { ROOMS } from './data.ts';
import { searchRooms } from './service.ts';
const form = document.querySelector<HTMLFormElement>('#search-form')!;
const select = document.querySelector<HTMLSelectElement>('#room')!;
const status = document.querySelector<HTMLElement>('#feedback')!;
const input = (id: string) => document.querySelector<HTMLInputElement>('#' + id)!;
function minutes(value: string): number | null {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) return null;
  const [h,m] = value.split(':').map(Number); return h*60+m;
}
function format(value: number) { return `${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`; }
function refresh() {
  try {
    const equipment = [...form.querySelectorAll<HTMLInputElement>('input[type=checkbox]:checked')].map(el=>el.value);
    const data = searchRooms(ROOMS, Number(input('attendees').value), equipment, select.value,
      minutes(input('start').value), minutes(input('end').value));
    select.replaceChildren(...data.rooms.map(room=>{
      const option=document.createElement('option'); option.value=room.id;
      option.textContent=`${room.id} ${room.name} (${room.capacity})${room.isBlocked?' - BLOCKED':''}`;
      return option;
    }));
    select.value=data.selectedId ?? ''; select.disabled=!data.rooms.length;
    status.textContent=data.result ? `${data.result.decision === 'available' ? 'Available' : 'Unavailable'}: ${data.result.reasons.join(' ')}` : data.emptyMessage;
    status.dataset.available=String(data.result?.decision==='available');
    const room=data.rooms.find(room=>room.id===data.selectedId);
    document.querySelector('#room-detail')!.textContent=room ? `Equipment: ${room.equipment.join(', ')}. Bookings: ${room.bookings.map(b=>`${format(b.start)}-${format(b.end)}`).join(', ') || 'none'}.` : '';
  } catch(error) {
    status.textContent=error instanceof Error ? error.message : 'Unable to check rooms.';
    delete status.dataset.available; select.replaceChildren(); select.disabled=true;
    document.querySelector('#room-detail')!.textContent='';
  }
}
form.addEventListener('submit',event=>{event.preventDefault();refresh();});
form.addEventListener('change',refresh);
refresh();
