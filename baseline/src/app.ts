import { checkAvailability } from './validation.ts';
const room = {id:'R101', name:'Innovation Lab', isBlocked:false};
const bookings = [{id:'B1', start:600, end:660}];
const form=document.querySelector('form')!;
function run() {
  const values=['start','end'].map(id=>{
    const value=document.querySelector<HTMLInputElement>('#'+id)!.value;
    if (!value) return null;
    const [h,m]=value.split(':').map(Number); return h*60+m;
  });
  const result=checkAvailability(room,values[0],values[1],540,bookings);
  document.querySelector('#feedback')!.textContent=`${result.decision}: ${result.reasons.join(' ')}`;
}
form.addEventListener('submit',event=>{event.preventDefault();run();});
form.addEventListener('change',run);run();
