// Konu: K25 Büyücülük Okulu · Varyant c (Ravenclaw)
export const API_URL = 'https://hp-api.onrender.com/api/characters/house/ravenclaw';
// Yedek: HP-API'nin kendi GitHub deposundaki veri dosyası (sunucu kapalıysa)
export const FALLBACK_URL =
  'https://raw.githubusercontent.com/KostaSav/hp-api/master/data/characters.json';

// Binaya göre kart renkleri
export const houseColors = {
  Ravenclaw: { main: '#1F3A93', light: '#E3E9F8', accent: '#946B2D' },
  Gryffindor: { main: '#7F0909', light: '#F8E3E3', accent: '#D3A625' },
  Slytherin: { main: '#1A472A', light: '#E2F0E6', accent: '#9A9A9A' },
  Hufflepuff: { main: '#B8860B', light: '#FBF3DC', accent: '#372E29' },
  default: { main: '#555555', light: '#EEEEEE', accent: '#999999' },
};

export function getHouseColor(house) {
  return houseColors[house] || houseColors.default;
}

// "Luna Lovegood" -> "LL"
export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

// Boş alan kontrolü: "", null, undefined ya da boş dizi
export function isEmpty(value) {
  return value === null || value === undefined || value === '' ||
    (Array.isArray(value) && value.length === 0);
}

const woods = {
  elm: 'karaağaç', walnut: 'ceviz', vine: 'asma', oak: 'meşe', holly: 'çobanpüskülü',
  fir: 'köknar', willow: 'söğüt', hazel: 'fındık', birch: 'huş', chestnut: 'kestane',
  mahogany: 'maun', cypress: 'servi', hawthorn: 'alıç', yew: 'porsuk', larch: 'melez çam',
  ash: 'dişbudak', alder: 'kızılağaç', cherry: 'kiraz', hornbeam: 'gürgen', cedar: 'sedir',
};
const cores = {
  'unicorn hair': 'tek boynuzlu at kılı',
  'unicorn tail hair': 'tek boynuzlu at kılı',
  'phoenix feather': 'anka kuşu tüyü',
  'phoenix tail feather': 'anka kuşu tüyü',
  'dragon heartstring': 'ejderha kalp teli',
};

function capitalize(text) {
  return text.charAt(0).toLocaleUpperCase('tr-TR') + text.slice(1);
}

// { wood: "willow", core: "unicorn hair", length: 10.75 } -> "Söğüt, tek boynuzlu at kılı, 10,75 inç"
export function formatWand(wand) {
  if (!wand) return '';
  const parts = [];
  if (wand.wood) parts.push(woods[wand.wood] || wand.wood);
  if (wand.core) parts.push(cores[wand.core] || wand.core);
  if (wand.length) parts.push(`${wand.length.toLocaleString('tr-TR')} inç`);
  return parts.length ? capitalize(parts.join(', ')) : '';
}
