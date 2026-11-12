import assert from 'node:assert/strict';
import {test} from 'node:test';
import {ROOMS} from '../final/src/data.ts';
import {filterRooms} from '../final/src/filtering.ts';
import {searchRooms} from '../final/src/service.ts';
import {checkAvailability} from '../final/src/validation.ts';
const search=(id='R101',people=4,equipment=[])=>searchRooms(ROOMS,people,equipment,id,660,720);
test('Catalog four unique complete rooms',()=>{
 assert.equal(ROOMS.length,4);assert.equal(new Set(ROOMS.map(r=>r.id)).size,4);
 assert.ok(ROOMS.every(r=>r.name && r.capacity>0 && r.equipment.length && Array.isArray(r.bookings)));
});
test('F1 exact capacity included',()=>assert.ok(filterRooms(ROOMS,4,[]).includes(ROOMS[0])));
test('F1 insufficient capacity excluded',()=>assert.ok(!filterRooms(ROOMS,5,[]).includes(ROOMS[0])));
test('F2 ALL equipment required',()=>assert.deepEqual(filterRooms(ROOMS,1,['Projector','Computers']).map(r=>r.id),['R103']));
test('F2 partial equipment excluded',()=>assert.ok(!filterRooms(ROOMS,1,['Projector','Computers']).includes(ROOMS[1])));
test('F2 empty equipment returns capacity matches',()=>assert.equal(filterRooms(ROOMS,1,[]).length,4));
test('F3 blocked room unavailable',()=>assert.match(search('R104').result.reasons.join(' '),/blocked/));
test('F4 empty clears selection and result',()=>{
 const r=search('R101',25);assert.deepEqual(r.rooms,[]);assert.equal(r.selectedId,null);assert.equal(r.result,null);assert.match(r.emptyMessage,/No rooms/);
});
test('F5 integration switching uses chosen room bookings',()=>{
 assert.equal(search('R101').result.decision,'available');
 assert.equal(search('R102').result.decision,'unavailable');
});
test('F5 integration filters reset selection',()=>{
 const r=search('R101',4,['Computers']);assert.equal(r.selectedId,'R103');assert.equal(r.result.decision,'available');
});
test('Invalid attendees rejected',()=>{for(const n of [0,-1,1.5,NaN]) assert.throws(()=>filterRooms(ROOMS,n,[]));});
test('Room and nested booking data frozen',()=>assert.throws(()=>{ROOMS[0].bookings[0].end=800},TypeError));
test('Missing times return explanatory reason',()=>assert.match(checkAvailability(ROOMS[0],null,720,540,[]).reasons[0],/both/));
test('Missing room is unavailable',()=>assert.equal(checkAvailability(null,660,720,540,[]).decision,'unavailable'));
test('One minute after now allowed with no conflict',()=>assert.equal(checkAvailability(ROOMS[0],541,570,540,[]).decision,'available'));
