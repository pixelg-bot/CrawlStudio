import {spawn} from 'node:child_process';import path from 'node:path';import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
process.env.PLAYWRIGHT_BROWSERS_PATH ||= path.join(root,'data','browsers');
const run=args=>new Promise((resolve,reject)=>{const child=spawn(process.execPath,args,{cwd:root,stdio:'inherit',env:process.env,windowsHide:true});child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error('Installer exited with code '+code)))});
if(!process.env.npm_execpath)throw Error('Run this installer using npm run install-browser');
await run([process.env.npm_execpath,'install','playwright','axe-core','amphtml-validator']);
await run([path.join(root,'node_modules','playwright','cli.js'),'install','chromium']);
