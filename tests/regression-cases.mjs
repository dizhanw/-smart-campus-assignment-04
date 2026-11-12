import assert from 'node:assert/strict';
import { test } from 'node:test';
export function registerRegression(checkAvailability, prefix) {
  const room={id:'R101',name:'Innovation Lab',capacity:4,equipment:['Whiteboard'],isBlocked:false,bookings:[]};
  const booking={id:'B1',start:600,end:660};
  const cases=[
    ['T01 touches booking end',660,720,true],
    ['T02 starts exactly now',540,570,false],
    ['T03 zero duration',720,720,false],
    ['T04 reversed interval',750,720,false],
    ['T05 beyond day end',1380,1441,false],
    ['T06 exactly 120 minutes',720,840,true],
    ['T07 121 minutes',720,841,false],
    ['T08 touches booking start',570,600,true],
    ['T09 partial overlap',630,690,false],
    ['T10 contains booking',570,690,false],
    ['T11 inside booking',615,645,false],
    ['T12 identical booking',600,660,false],
    ['T13 blocked room',660,720,false,{...room,isBlocked:true}],
    ['T14 no bookings',630,690,true,room,[]],
    ['Extra 1 exact 120 later',1200,1320,true],
    ['Extra 2 gap between bookings',630,690,true,room,[{id:'A',start:600,end:630},{id:'B',start:690,end:720}]],
  ];
  for (const [name,start,end,expected,chosen=room,bookings=[booking]] of cases)
    test(`${prefix} ${name}`,()=>assert.equal(checkAvailability(chosen,start,end,540,bookings).decision,expected?'available':'unavailable'));
  test(`${prefix} AC5 repeated checks preserve bookings`,()=>{
    const bookings=[{...booking}]; const before=JSON.stringify(bookings);
    checkAvailability(room,660,720,540,bookings);checkAvailability(room,660,720,540,bookings);
    assert.equal(JSON.stringify(bookings),before);
  });
}
