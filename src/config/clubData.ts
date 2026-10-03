import img1 from '../assets/gallery/1.jpg';
import img2 from '../assets/gallery/2.jpg';
import img3 from '../assets/gallery/3.jpg';
import img4 from '../assets/gallery/4.jpg';
import img5 from '../assets/gallery/5.jpg';
import img6 from '../assets/gallery/6.jpg';
import img7 from '../assets/gallery/7.jpg';
import img8 from '../assets/gallery/8.jpg';
import img9 from '../assets/gallery/9.jpg';
import img10 from '../assets/gallery/10.jpg';
import img11 from '../assets/gallery/11.jpg';
import img12 from '../assets/gallery/12.jpg';
import img13 from '../assets/gallery/13.jpg';
import img14 from '../assets/gallery/14.jpg';
import img15 from '../assets/gallery/15.jpg';
import img16 from '../assets/gallery/16.jpg';

export interface CalendarEvent {
  id: string;
  date: string;
  day: string;
  title: string;
  time: string;
  location: string;
  ageGroup: string;
}

export interface DonationGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  category: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  description: string;
}

export interface ClubInfo {
  name: string;
  tagline: string;
  aboutText: string;
  stats: { label: string; value: string | number }[];
  contact: {
    time: string;
    phone: string;
    address: string;
    info: string;
    infoUrl: string;
  };
}

const yearsRunning = new Date().getFullYear() - 2002;

export const clubInfo: ClubInfo = {
  name: "Chorley Wildcats",
  tagline: "Unleash Your Potential, Join the Pack!",
  aboutText: "Formed in 2002, we are a sports club for children aged 4-18 who have additional needs. We meet every Saturday at Chorley All Seasons Leisure Centre betwee 9am - 11am. Developing fine and gross motor sklls, peer interaction through sport at their level.",
  stats: [
    { label: "Years Running", value: yearsRunning },
    { label: "Members", value: 20 },
    { label: "Volunteers", value: 6 },
    { label: "Number of Sports", value: 14 }
  ],
  contact: {
    time: "Every Saturday 9am - 11am (except late December and early January)",
    phone: "01257 51553",
    address: "Chorley All Seasons Leisure Centre, Water Street, Chorley PR7 1EX",
    info: "Website maintained by Andy Hudson",
    infoUrl: "https://www.linkedin.com/in/andy-hudson"
  }
};

export const calendarEvents: CalendarEvent[] = [
  {
    id: "1",
    date: "Every Saturday",
    day: "Saturday",
    title: "Junior Football Academy",
    time: "09:30 AM - 11:00 AM",
    location: "Main Astroturf Pitch",
    ageGroup: "Ages 5-9"
  },
  {
    id: "2",
    date: "Every Saturday",
    day: "Saturday",
    title: "Senior Football Training",
    time: "11:15 AM - 12:45 PM",
    location: "Main Astroturf Pitch",
    ageGroup: "Ages 10-14"
  },
  {
    id: "3",
    date: "Every Tuesday",
    day: "Tuesday",
    title: "Wildcats Basketball Hoopstars",
    time: "05:30 PM - 07:00 PM",
    location: "Indoor Sports Hall",
    ageGroup: "Ages 7-12"
  },
  {
    id: "4",
    date: "Every Thursday",
    day: "Thursday",
    title: "Athletics & Dodgeball Fun",
    time: "05:00 PM - 06:30 PM",
    location: "Indoor Sports Hall / Track",
    ageGroup: "Ages 6-11"
  },
  {
    id: "5",
    date: "August 29, 2026",
    day: "Saturday",
    title: "Wildcats Summer Sports Festival",
    time: "10:00 AM - 04:00 PM",
    location: "Chorley Playing Fields",
    ageGroup: "All Ages Welcome"
  }
];

export const donationGoals: DonationGoal[] = [
  {
    id: "1",
    title: "New Training Footballs & Goals",
    description: "Sponsor new premium training balls and portable pop-up goals for our soccer academy.",
    target: 500,
    current: 380,
    category: "Equipment"
  },
  {
    id: "2",
    title: "Sponsor a Full Team Kit",
    description: "Help us provide professional red and white custom Wildcats jerseys and shorts for children who cannot afford them.",
    target: 1200,
    current: 850,
    category: "Uniforms"
  },
  {
    id: "3",
    title: "Indoor Hall Winter Rental",
    description: "Assists with renting the warm indoor community hall during the cold winter months.",
    target: 2000,
    current: 1100,
    category: "Facilities"
  },
  {
    id: "4",
    title: "First Aid & Coaching Badges",
    description: "Fund advanced safeguarding and First Aid training courses for our coaching team.",
    target: 400,
    current: 400,
    category: "Coaching"
  }
];
export const galleryItems: GalleryItem[] = [
  {
    id: "1",
    url: img1,
    title: "Floorball Action",
    description: "Developing stick-handling, coordination, and team play in the sports hall."
  },
  {
    id: "2",
    url: img2,
    title: "Indoor Javelin & Athletics",
    description: "Practicing throwing technique and having fun with adapted athletics gear."
  },
  {
    id: "3",
    url: img3,
    title: "Smiles Behind the Scenes",
    description: "Good fun and laughs with our coaching and volunteer team."
  },
  {
    id: "4",
    url: img4,
    title: "Wheelchair Basketball",
    description: "Inclusive sports for everyone — dribbling, passing, and teamwork on court."
  },
  {
    id: "5",
    url: img5,
    title: "Standing Long Jump",
    description: "Testing power, balance, and landing technique on the measurement mat."
  },
  {
    id: "6",
    url: img6,
    title: "Speed Bounce Challenge",
    description: "Building agility, rhythm, and cardiovascular fitness two feet at a time."
  },
  {
    id: "7",
    url: img7,
    title: "Athletics in Motion",
    description: "Working on gross motor skills and explosive jumping with coach support."
  },
  {
    id: "8",
    url: img8,
    title: "Indoor Football Skills",
    description: "Penalty practice, ball control, and shooting skills on the turf."
  },
  {
    id: "9",
    url: img9,
    title: "Celebrating Success",
    description: "High energy, team spirit, and pure joy after a great session."
  },
  {
    id: "10",
    url: img10,
    title: "Our Dedicated Volunteers",
    description: "Warm, supportive leaders making every Saturday morning possible."
  },
  {
    id: "11",
    url: img11,
    title: "Indoor Cricket",
    description: "At the crease! Learning batting stance, hand-eye coordination, and scoring runs."
  },
  {
    id: "12",
    url: img12,
    title: "Coaching & Support",
    description: "One-on-one guidance to help every young player build confidence."
  },
  {
    id: "13",
    url: img13,
    title: "Balance & Movement Fun",
    description: "Creative games like balloon relays that build motor control and lots of laughs."
  },
  {
    id: "14",
    url: img14,
    title: "Curling",
    description: "Precision, aim, and strategy sliding stones towards the target mat."
  },
  {
    id: "15",
    url: img15,
    title: "Table Tennis Rallies",
    description: "Fast-paced rallies developing quick reflexes and friendly competition."
  },
  {
    id: "16",
    url: img16,
    title: "Basketball Dribbling Drills",
    description: "Mastering bounce control and court awareness in a fun, sensory-friendly environment."
  }
];
