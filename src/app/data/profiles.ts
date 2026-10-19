export interface Profile {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  photo: string;
  caste: string;
  surname: string;
  district: string;
  subdistrict: string;
  occupation: string;
  education: string;
  height: string;
  income: string;
  verified: boolean;
  online: boolean;
  bio: string;
  hobbies: string[];
}

const avatar = (seed: string) => `https://i.pravatar.cc/400?u=${seed}`;

export const PROFILES: Profile[] = [
  {
    id: 1, name: 'Aaradhya', age: 24, gender: 'Female', photo: avatar('aaradhya'),
    caste: 'Brahmin', surname: 'Sharma', district: 'Raipur', subdistrict: 'Raipur',
    occupation: 'Software Engineer', education: 'B.Tech (CS)', height: "5'4\"",
    income: '8 LPA', verified: true, online: true,
    bio: 'A software engineer who loves classical music and family values.',
    hobbies: ['Music', 'Reading', 'Cooking'],
  },
  {
    id: 2, name: 'Rohit', age: 27, gender: 'Male', photo: avatar('rohit'),
    caste: 'Yadav / Ahir', surname: 'Yadav', district: 'Durg', subdistrict: 'Durg',
    occupation: 'Govt Officer', education: 'M.A.', height: "5'9\"",
    income: '7 LPA', verified: true, online: false,
    bio: 'Government officer looking for a caring life partner.',
    hobbies: ['Cricket', 'Travel', 'Politics'],
  },
  {
    id: 3, name: 'Priyanka', age: 25, gender: 'Female', photo: avatar('priyanka'),
    caste: 'Kurmi', surname: 'Kurmi', district: 'Bilaspur', subdistrict: 'Bilaspur',
    occupation: 'Teacher', education: 'B.Ed', height: "5'3\"",
    income: '4 LPA', verified: true, online: true,
    bio: 'Teacher with traditional values and modern outlook.',
    hobbies: ['Teaching', 'Painting', 'Yoga'],
  },
  {
    id: 4, name: 'Aakash', age: 29, gender: 'Male', photo: avatar('aakash'),
    caste: 'Sahu', surname: 'Sahu', district: 'Raigarh', subdistrict: 'Kharsia',
    occupation: 'Businessman', education: 'MBA', height: "5'10\"",
    income: '15 LPA', verified: false, online: false,
    bio: 'Entrepreneur running a family business in Raigarh.',
    hobbies: ['Business', 'Cars', 'Movies'],
  },
  {
    id: 5, name: 'Sneha', age: 23, gender: 'Female', photo: avatar('sneha'),
    caste: 'Baniya / Agarwal', surname: 'Agrawal', district: 'Raipur', subdistrict: 'Abhanpur',
    occupation: 'Doctor', education: 'MBBS', height: "5'2\"",
    income: '10 LPA', verified: true, online: true,
    bio: 'Doctor dedicated to serving rural Chhattisgarh.',
    hobbies: ['Medicine', 'Dance', 'Travel'],
  },
  {
    id: 6, name: 'Vikas', age: 28, gender: 'Male', photo: avatar('vikas'),
    caste: 'Kshatriya', surname: 'Singh', district: 'Bastar', subdistrict: 'Jagdalpur',
    occupation: 'Forest Officer', education: 'B.Sc Forestry', height: "5'11\"",
    income: '6 LPA', verified: true, online: true,
    bio: 'Nature lover working in Bastar forests.',
    hobbies: ['Trekking', 'Photography', 'Wildlife'],
  },
  {
    id: 7, name: 'Anjali', age: 26, gender: 'Female', photo: avatar('anjali'),
    caste: 'Teli', surname: 'Sahu', district: 'Dhamtari', subdistrict: 'Kurud',
    occupation: 'Bank Manager', education: 'M.Com', height: "5'5\"",
    income: '9 LPA', verified: true, online: false,
    bio: 'Banking professional with strong family bonds.',
    hobbies: ['Finance', 'Cooking', 'Gardening'],
  },
  {
    id: 8, name: 'Deepak', age: 30, gender: 'Male', photo: avatar('deepak'),
    caste: 'Brahmin', surname: 'Pandey', district: 'Janjgir-Champa', subdistrict: 'Champa',
    occupation: 'Professor', education: 'PhD', height: "5'8\"",
    income: '12 LPA', verified: true, online: true,
    bio: 'College professor passionate about education.',
    hobbies: ['Reading', 'Writing', 'Debating'],
  },
  {
    id: 9, name: 'Kavita', age: 24, gender: 'Female', photo: avatar('kavita'),
    caste: 'Satnami', surname: 'Das', district: 'Mahasamund', subdistrict: 'Basna',
    occupation: 'Nurse', education: 'B.Sc Nursing', height: "5'1\"",
    income: '5 LPA', verified: false, online: true,
    bio: 'Nurse with kind heart looking for understanding partner.',
    hobbies: ['Healthcare', 'Music', 'Stitching'],
  },
  {
    id: 10, name: 'Saurabh', age: 26, gender: 'Male', photo: avatar('saurabh'),
    caste: 'Yadav / Ahir', surname: 'Verma', district: 'Korba', subdistrict: 'Katghora',
    occupation: 'Engineer', education: 'B.Tech (Mech)', height: "5'9\"",
    income: '7 LPA', verified: true, online: false,
    bio: 'Mechanical engineer in Korba power sector.',
    hobbies: ['Football', 'Gaming', 'Tech'],
  },
  {
    id: 11, name: 'Pooja', age: 27, gender: 'Female', photo: avatar('pooja'),
    caste: 'Gond', surname: 'Markam', district: 'Kanker', subdistrict: 'Bhanupratappur',
    occupation: 'Social Worker', education: 'MSW', height: "5'4\"",
    income: '4 LPA', verified: true, online: true,
    bio: 'Tribal welfare social worker from Kanker.',
    hobbies: ['Social work', 'Folk dance', 'Farming'],
  },
  {
    id: 12, name: 'Manish', age: 29, gender: 'Male', photo: avatar('manish'),
    caste: 'Kurmi', surname: 'Patel', district: 'Rajnandgaon', subdistrict: 'Khairagarh',
    occupation: 'Farmer', education: 'B.Sc Agri', height: "5'8\"",
    income: '8 LPA', verified: false, online: false,
    bio: 'Agriculturist managing family farmlands.',
    hobbies: ['Farming', 'Volleyball', 'Politics'],
  },
  {
    id: 13, name: 'Ritika', age: 22, gender: 'Female', photo: avatar('ritika'),
    caste: 'Brahmin', surname: 'Tiwari', district: 'Raipur', subdistrict: 'Tilda',
    occupation: 'Student', education: 'M.Sc', height: "5'3\"",
    income: '—', verified: true, online: true,
    bio: 'Post-graduate student preparing for civil services.',
    hobbies: ['Study', 'Yoga', 'Music'],
  },
  {
    id: 14, name: 'Ankit', age: 28, gender: 'Male', photo: avatar('ankit'),
    caste: 'Baniya / Agarwal', surname: 'Jaiswal', district: 'Bilaspur', subdistrict: 'Masturi',
    occupation: 'CA', education: 'Chartered Accountant', height: "5'7\"",
    income: '14 LPA', verified: true, online: true,
    bio: 'Chartered Accountant with own practice in Bilaspur.',
    hobbies: ['Finance', 'Chess', 'Travel'],
  },
  {
    id: 15, name: 'Lakshmi', age: 25, gender: 'Female', photo: avatar('lakshmi'),
    caste: 'Halba', surname: 'Chandrakar', district: 'Durg', subdistrict: 'Patan',
    occupation: 'Govt Teacher', education: 'M.A., B.Ed', height: "5'4\"",
    income: '6 LPA', verified: true, online: false,
    bio: 'Government school teacher passionate about kids.',
    hobbies: ['Teaching', 'Singing', 'Cooking'],
  },
];
