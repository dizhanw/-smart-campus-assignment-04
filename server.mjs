import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { stripTypeScriptTypes } from 'node:module';
import path from 'node:path';

export function makeServer(version='final') {
  if (!['baseline','final'].includes(version)) throw new Error('Unknown version');
  const root=fileURLToPath(new URL(`./${version}/`,import.meta.url));
  return createServer(async(req,res)=>{
    const url=new URL(req.url,'http://localhost');
    const relative=url.pathname==='/'?'index.html':url.pathname.slice(1);
    if (!/^(index\.html|style\.css|src\/[a-z]+\.ts)$/.test(relative)) {res.writeHead(404).end();return;}
    try {
      let body=await readFile(path.join(root,relative),'utf8');
      const ts=relative.endsWith('.ts');
      if (ts) body=stripTypeScriptTypes(body);
      res.writeHead(200,{'Content-Type':ts?'text/javascript; charset=utf-8':relative.endsWith('.css')?'text/css':'text/html; charset=utf-8'}).end(body);
    } catch {res.writeHead(404).end('Not found');}
  });
}
if (process.argv[1] && fileURLToPath(import.meta.url)===path.resolve(process.argv[1])) {
  const version=process.argv[2] ?? 'final'; const port=version==='baseline'?8001:8000;
  makeServer(version).listen(port,'127.0.0.1',()=>console.log(`${version}: http://127.0.0.1:${port}`));
}
