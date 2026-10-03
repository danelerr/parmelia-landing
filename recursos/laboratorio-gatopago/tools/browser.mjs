import {spawnSync} from 'node:child_process';
import {readFile} from 'node:fs/promises';
const cli='C:/Users/danie/AppData/Local/npm-cache/_npx/31e32ef8478fbf80/node_modules/@playwright/cli/playwright-cli.js';
let args=process.argv.slice(2);
if(args[0]==='eval-file')args=['eval',await readFile(args[1],'utf8')];
if(args[0]==='run-code-file')args=['run-code',await readFile(args[1],'utf8')];
const session=process.env.GATOPAGO_LAB_BROWSER_SESSION||'gp-lab';
const result=spawnSync(process.execPath,[cli,'-s='+session,...args],{stdio:'inherit',windowsHide:true});
process.exit(result.status??1);
