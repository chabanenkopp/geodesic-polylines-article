export const MOCK_ORIGINS_DATA = [
  {
    id: 1,
    title: 'Kyiv',
    coordinates: { lat: 50.450001, lon: 30.523333 },
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Lavra_Kyiv.JPG',
    flights: [
      { id: 4, duration: 75, isAvailable: true },
      { id: 5, duration: 80, isAvailable: true },
      { id: 6, duration: 50, isAvailable: true },
    ],
  },
  {
    id: 2,
    title: 'Kharkiv',
    coordinates: { lat: 49.988358, lon: 36.232845 },
    src:
      'https://images.novyny.live/images/thumbnail/1366x570/613a3b31dca30-khar-kov-15.jpg',
    flights: [
      { id: 4, duration: 85, isAvailable: false },
      { id: 5, duration: 90, isAvailable: true },
      { id: 6, duration: 60, isAvailable: true },
    ],
  },
  {
    id: 3,
    title: 'Mariupol',
    coordinates: { lat: 47.097133, lon: 37.543367 },
    src: 'https://pr.ua/userfiles/news/2021/06/onegina/marnyrdjrjgi.jpg',
    flights: [
      { id: 4, duration: 95, isAvailable: false },
      { id: 5, duration: 100, isAvailable: false },
      { id: 6, duration: 70, isAvailable: true },
    ],
  },
]
export const MOCK_DESTINATIONS_DATA = [
  {
    id: 4,
    title: 'Stockholm',
    coordinates: { lat: 59.3369241797981, lon: 18.068564023967703 },
  },
  {
    id: 5,
    title: 'Rome',
    coordinates: { lat: 41.902782, lon: 12.496366 },
  },
  {
    id: 6,
    title: 'Bratislava',
    coordinates: { lat: 48.148598, lon: 17.107748 },
  },
]
