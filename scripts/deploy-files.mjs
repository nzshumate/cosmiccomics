import { readdir, readFile } from 'node:fs/promises'
const files = []
async function walk(dir = '.') {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (
      [
        'node_modules',
        '.nuxt',
        '.output',
        '.git',
        '.vercel',
        'test-results',
        'playwright-report',
      ].includes(item.name) ||
      item.name.startsWith('.env')
    )
      continue
    const path = `${dir}/${item.name}`
    if (item.isDirectory()) await walk(path)
    else files.push({ path: path.replace(/^\.\//, ''), content: await readFile(path, 'utf8') })
  }
}
await walk()
console.log(JSON.stringify(files))
