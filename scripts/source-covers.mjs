import { writeFile } from 'node:fs/promises'
const pages = [
  ['saga-1', 'https://imagecomics.com/comics/releases/saga-1'],
  ['invincible-1', 'https://imagecomics.com/comics/releases/invincible-1'],
  ['monstress-1', 'https://imagecomics.com/comics/releases/monstress-1'],
  ['radiant-black-1', 'https://imagecomics.com/comics/releases/radiant-black-1'],
  ['paper-girls-1', 'https://imagecomics.com/comics/releases/paper-girls-1'],
  ['east-of-west-1', 'https://imagecomics.com/comics/releases/east-of-west-1'],
  ['transformers-1', 'https://imagecomics.com/comics/releases/transformers-1'],
  ['void-rivals-1', 'https://imagecomics.com/comics/releases/void-rivals-1'],
  ['absolute-batman-1', 'https://www.dc.com/comics/absolute-batman-2024/absolute-batman-1'],
  [
    'absolute-wonder-woman-1',
    'https://www.dc.com/comics/absolute-wonder-woman-2024/absolute-wonder-woman-1',
  ],
  ['absolute-superman-1', 'https://www.dc.com/comics/absolute-superman-2024/absolute-superman-1'],
  ['absolute-batman-22', 'https://www.dc.com/comics/absolute-batman-2024/absolute-batman-2024-22'],
  [
    'absolute-wonder-woman-22',
    'https://www.dc.com/comics/absolute-wonder-woman-2024/absolute-wonder-woman-2024-22',
  ],
  [
    'absolute-superman-22',
    'https://www.dc.com/comics/absolute-superman-2024/absolute-superman-2024-22',
  ],
]
const results = await Promise.all(
  pages.map(async ([id, url]) => {
    const res = await fetch(url)
    const html = await res.text()
    const tags = html.match(/<meta\b[^>]*>/gi) || []
    const get = (key) => {
      const tag = tags.find((t) => t.includes('"' + key + '"'))
      return tag
        ?.match(/content="([^"]*)"/)?.[1]
        ?.replaceAll('&amp;', '&')
        .replaceAll('&#039;', "'")
        .replaceAll('&quot;', '"')
    }
    const record = {
      id,
      url,
      status: res.status,
      title: get('og:title'),
      image:
        get('og:image') ||
        html.match(/https:\/\/static\.dc\.com\/[^"<> ]+\.(?:jpg|png|webp)\?w=640/)?.[0],
      description: get('description'),
    }
    console.log(JSON.stringify(record))
    return record
  }),
)
await writeFile('app/data/sources.json', JSON.stringify(results, null, 2))
