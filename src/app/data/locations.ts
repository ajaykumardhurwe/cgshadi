export interface District {
  name: string;
  division: string;
  subdistricts: string[];
}

export const DISTRICTS: District[] = [
  { name: 'Raipur', division: 'Central', subdistricts: ['Raipur', 'Abhanpur', 'Tilda', 'Arang', 'Dharsiwa'] },
  { name: 'Durg', division: 'West-Central', subdistricts: ['Durg', 'Patan', 'Dhamdha'] },
  { name: 'Bhilai', division: 'West-Central', subdistricts: ['Bhilai Nagar', 'Risali', 'Khursipar'] },
  { name: 'Bilaspur', division: 'North', subdistricts: ['Bilaspur', 'Masturi', 'Bilha', 'Kota'] },
  { name: 'Bastar', division: 'South', subdistricts: ['Jagdalpur', 'Bastar', 'Bakawand'] },
  { name: 'Dhamtari', division: 'Central', subdistricts: ['Dhamtari', 'Magarlod', 'Kurud', 'Nagri'] },
  { name: 'Raigarh', division: 'North', subdistricts: ['Raigarh', 'Kharsia', 'Sarangarh', 'Baramkela'] },
  { name: 'Korba', division: 'North', subdistricts: ['Korba', 'Katghora', 'Pali', 'Kartala'] },
  { name: 'Janjgir-Champa', division: 'North', subdistricts: ['Janjgir', 'Champa', 'Naila', 'Pamgarh'] },
  { name: 'Rajnandgaon', division: 'West-Central', subdistricts: ['Rajnandgaon', 'Khairagarh', 'Chhuikhadan', 'Gandai'] },
  { name: 'Mahasamund', division: 'Central', subdistricts: ['Mahasamund', 'Basna', 'Pithora', 'Saraipali'] },
  { name: 'Kanker', division: 'South', subdistricts: ['Kanker', 'Bhanupratappur', 'Narharpur'] },
  { name: 'Dantewada', division: 'South', subdistricts: ['Dantewada', 'Geedam', 'Katekalyan'] },
  { name: 'Surguja', division: 'North', subdistricts: ['Ambikapur', 'Wadrafnagar', 'Lakhanpur', 'Sitapur'] },
  { name: 'Jashpur', division: 'North', subdistricts: ['Jashpur', 'Kunkuri', 'Manora', 'Pathalgaon'] },
  { name: 'Koriya', division: 'North', subdistricts: ['Baikunthpur', 'Manendragarh', 'Khatri'] },
  { name: 'Sukma', division: 'South', subdistricts: ['Sukma', 'Konta', 'Chhindgarh'] },
  { name: 'Balod', division: 'West-Central', subdistricts: ['Balod', 'Dondi', 'Gunderdehi', 'Dondilohara'] },
  { name: 'Bemetara', division: 'West-Central', subdistricts: ['Bemetara', 'Saja', 'Berla', 'Nawagarh'] },
  { name: 'Mungeli', division: 'Central', subdistricts: ['Mungeli', 'Lormi', 'Pathariya', 'Bilaspur'] },
  { name: 'Baloda Bazar', division: 'Central', subdistricts: ['Baloda Bazar', 'Bilaipar', 'Parsada', 'Kasdol'] },
  { name: 'Gariaband', division: 'Central', subdistricts: ['Gariaband', 'Mainpur', 'Deobhog', 'Chhura'] },
  { name: 'Kondagaon', division: 'South', subdistricts: ['Kondagaon', 'Keshkal', 'Makdi'] },
  { name: 'Narayanpur', division: 'South', subdistricts: ['Narayanpur', 'Orchha', 'Bandegaon'] },
  { name: 'Surajpur', division: 'North', subdistricts: ['Surajpur', 'Pratappur', 'Ramchandrapur'] },
  { name: 'Sakti', division: 'North', subdistricts: ['Sakti', 'Pithori', 'Jaijaipur'] },
  { name: 'Sarangarh-Bilaigarh', division: 'Central', subdistricts: ['Sarangarh', 'Bilaigarh', 'Kasdol'] },
];

export const CASTES: string[] = [
  'Brahmin',
  'Kshatriya',
  'Yadav / Ahir',
  'Kurmi',
  'Teli',
  'Sahu',
  'Satnami',
  'Gond',
  'Oraon',
  'Halba',
  'Bunkar (Weaver)',
  'Kalar',
  'Mahar',
  'Chamar',
  'Nai',
  'Kewat',
  'Dhimar',
  'Adivasi',
  'Baniya / Agarwal',
  'Pandey (Brahmin)',
  'General / Others',
];

export const SURNAMES: string[] = [
  'Verma', 'Sharma', 'Pandey', 'Tiwari', 'Dubey', 'Mishra', 'Shukla',
  'Tripathi', 'Chaturvedi', 'Agrawal', 'Sahu', 'Yadav', 'Kurmi',
  'Patel', 'Sinha', 'Singh', 'Prasad', 'Das', 'Lal', 'Kumar',
  'Banjare', 'Netam', 'Kawasi', 'Mandavi', 'Markam', 'Potai',
  'Baghel', 'Soni', 'Gupta', 'Jaiswal', 'Chandrakar',
  'Dewangan', 'Suryawanshi', 'Thakur', 'Rajput', 'Kshatriya',
  'Nishad', 'Kewat', 'Manikpuri', 'Porte', 'Kashyap', 'Bhardwaj',
];

export function subdistrictsOf(districtName: string | null): string[] {
  if (!districtName) return [];
  return DISTRICTS.find((d) => d.name === districtName)?.subdistricts ?? [];
}
