import { build } from 'esbuild';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

/** Build-time only: private code/media are embedded in the Worker, never public assets. */
export async function buildPrivateSite() {
  const files: Record<string, { contentType: string; base64: string }> = {};
  const root = process.cwd();
  const archiveNames = new Set(['site-header', 'site-footer', 'cookie-banner', 'marketing', 'closing-cta', 'demo-reel', 'pilot-signin-dialog']);
  const mediaTypes: Record<string, string> = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4', '.webm': 'video/webm', '.svg': 'image/svg+xml' };
  async function embed(filename: string, bytes: Uint8Array) {
    const key = createHash('sha256').update(filename).digest('hex').slice(0, 20) + path.extname(filename);
    files[key] = { contentType: mediaTypes[path.extname(filename)] ?? 'application/octet-stream', base64: Buffer.from(bytes).toString('base64') };
    return '/api/public/private-file?name=' + key;
  }
  const result = await build({
    entryPoints: ['src/site-archive/private-entry.tsx'], bundle: true, write: false,
    platform: 'browser', format: 'iife', target: 'es2022', minify: true,
    jsx: 'automatic', define: { 'process.env.NODE_ENV': '"production"' },
    plugins: [{ name: 'private-assets', setup(builder) {
      builder.onResolve({ filter: /^@\/lib\/enquiries.functions$/ }, () => ({ path: 'disabled-enquiries', namespace: 'private-stub' }));
      builder.onResolve({ filter: /^@tanstack\/react-start$/ }, () => ({ path: 'server-hook', namespace: 'private-stub' }));
      builder.onLoad({ filter: /.*/, namespace: 'private-stub' }, ({ path: name }) => ({
        contents: name === 'server-hook'
          ? 'export const useServerFn = fn => fn;'
          : 'const disabled = async () => {throw new Error("Enquiry submissions are paused during private viewing.")}; export const submitContact = disabled; export const submitDemoRequest = disabled;', loader: 'js',
      }));
      builder.onResolve({ filter: /^@\// }, async ({ path: name }) => {
        const component = name.replace('@/components/', '');
        const base = name.startsWith('@/components/') && archiveNames.has(component)
          ? path.join(root, 'src/site-archive/components', component)
          : path.join(root, 'src', name.slice(2));
        if (name.endsWith('?raw')) return { path: base.slice(0, -4), namespace: 'private-raw' };
        if (name.endsWith('.asset.json')) return { path: base, namespace: 'private-pointer' };
        if (mediaTypes[path.extname(base)]) return { path: base, namespace: 'private-media' };
        for (const extension of ['', '.tsx', '.ts']) {
          try { await readFile(base + extension); return { path: base + extension }; } catch { /* try next source extension */ }
        }
        return undefined;
      });
      builder.onLoad({ filter: /.*/, namespace: 'private-raw' }, async ({ path: filename }) => ({ contents: await readFile(filename, 'utf8'), loader: 'text' }));
      builder.onLoad({ filter: /.*/, namespace: 'private-media' }, async ({ path: filename }) => ({ contents: `export default ${JSON.stringify(await embed(filename, await readFile(filename)))}`, loader: 'js' }));
      builder.onLoad({ filter: /.*/, namespace: 'private-pointer' }, async ({ path: filename }) => {
        const source = filename.endsWith('demo-reel.mp4.asset.json') ? filename.replace('demo-reel.mp4.asset.json', 'demo-reel.webm.asset.json') : filename;
        const pointer = JSON.parse(await readFile(source, 'utf8'));
        // Build-only fetch of app media. Original public URLs are never sent to viewers.
        const response = await fetch('https://www.synoradrive.com.au' + pointer.url);
        if (!response.ok) throw new Error('Unable to package private media: ' + path.basename(filename));
        const url = await embed(pointer.original_filename, new Uint8Array(await response.arrayBuffer()));
        return { contents: `export default ${JSON.stringify({ url })}`, loader: 'js' };
      });
    } }],
  });
  const output = result.outputFiles[0];
  if (!output) throw new Error('Private website packaging produced no output');
  files['site.js'] = { contentType: 'text/javascript; charset=utf-8', base64: Buffer.from(output.contents).toString('base64') };
  await mkdir('src/private-generated', { recursive: true });
  // Remove stale generated files so superseded media cannot ship accidentally.
  const { readdir } = await import('node:fs/promises');
  for (const name of await readdir('src/private-generated')) await rm(path.join('src/private-generated', name));
  const imports: string[] = [];
  const entries: string[] = [];
  for (const [key, file] of Object.entries(files)) {
    const id = 'f' + imports.length;
    const filename = id + '.server.ts';
    await writeFile('src/private-generated/' + filename, 'export default ' + JSON.stringify(file) + ';\n');
    imports.push(`import ${id} from './${id}.server';`);
    entries.push(JSON.stringify(key) + ':' + id);
  }
  await rm('src/private-generated/site.server.ts', { force: true });
  await writeFile('src/private-generated/site.server.ts', imports.join('\n') + '\nexport const privateFiles: Record<string, { contentType: string; base64: string }> = {' + entries.join(',') + '};\n');
}