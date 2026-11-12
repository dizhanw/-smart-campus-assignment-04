import assert from 'node:assert/strict';
import {test, before, after} from 'node:test';
import {makeServer} from '../server.mjs';
let server,url;
before(async()=>{server=makeServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));url=`http://127.0.0.1:${server.address().port}`;});
after(async()=>{await new Promise(resolve=>server.close(resolve));});
test('HTTP final page exposes live feedback',async()=>assert.match(await(await fetch(url)).text(),/aria-live="polite"/));
test('HTTP TypeScript validation served as JavaScript',async()=>{
 const r=await fetch(url+'/src/validation.ts');assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/javascript/);
 const text=await r.text();assert.doesNotMatch(text,/: CheckResult/);assert.match(text,/start <= currentTime/);
});
test('HTTP UI recomputes on selection changes',async()=>assert.match(await(await fetch(url+'/src/app.ts')).text(),/addEventListener\('change',refresh\)/));
test('HTTP stylesheet includes mobile breakpoint',async()=>assert.match(await(await fetch(url+'/style.css')).text(),/@media\(max-width:600px\)/));
test('HTTP unknown route returns 404',async()=>assert.equal((await fetch(url+'/private')).status,404));
