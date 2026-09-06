export interface Comic {
  slug: string
  title: string
  publisher: 'DC' | 'Image Comics'
  writer: string
  artist: string
  genre: 'Superheroes' | 'Sci-fi' | 'Fantasy'
  year: number
  price: number
  image: string
  source: string
  description: string
  featured: boolean
  isNew: boolean
}
export interface CartLine {
  slug: string
  quantity: number
}
