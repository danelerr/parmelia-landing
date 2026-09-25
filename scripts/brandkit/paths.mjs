import path from 'node:path';
import fs from 'node:fs/promises';

/** Resolve the external app checkout explicitly, without hard-coded historical names. */
export async function appRoot() {
  const flag = process.argv.indexOf('--app-dir');
  const supplied = flag >= 0 ? process.argv[flag + 1] : process.env.GATOPAGO_APP_DIR;
  if (!supplied || supplied.startsWith('--')) {
    throw new Error('Set GATOPAGO_APP_DIR or pass --app-dir <path-to-app-checkout>.');
  }
  const root = path.resolve(supplied);
  await fs.access(path.join(root, 'client/public/manifest.webmanifest'));
  return root;
}
