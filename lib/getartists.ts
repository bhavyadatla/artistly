import staticArtists from './data.json';

export function getAllArtists() {
  if (typeof window === 'undefined') return staticArtists;
  const localData = localStorage.getItem('artistly_artists');
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      return [...staticArtists, ...parsed];
    } catch {
      return staticArtists;
    }
  }
  return staticArtists;
}