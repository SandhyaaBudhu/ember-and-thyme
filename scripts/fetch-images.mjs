import { mkdir, writeFile } from 'node:fs/promises'

const images = {
  hero: ['photo-1414235077428-338989a2e8c0', 2200],
  harvest: ['photo-1547592180-85f173990554', 1000],
  fish: ['photo-1519708227418-c8fd9a32b7a2', 1000],
  pasta: ['photo-1473093295043-cdd812d0e601', 1000],
  chef: ['photo-1577219491135-ce391730fb2c', 1200],
  wine: ['photo-1510812431401-41d2bd2722f3', 1400],
  room: ['photo-1517248135467-4c7edcad34c4', 1800],
  garden: ['photo-1542838132-92c53300491e', 1200],
}
await mkdir('public/images', { recursive: true })
await Promise.all(Object.entries(images).map(async ([name, [id, width]]) => {
  try {
    const response = await fetch(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`, { signal: AbortSignal.timeout(40000) })
    if (!response.ok) throw new Error(`${response.status}`)
    await writeFile(`public/images/${name}.jpg`, Buffer.from(await response.arrayBuffer()))
    console.log(`Saved ${name}`)
  } catch (error) { console.error(`Could not save ${name}: ${error.message}`) }
}))
