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
  mission: string;
  aboutText: string;
  stats: { label: string; value: string }[];
  contact: {
    email: string;
    phone: string;
    address: string;
    facebook: string;
  };
}

export const clubInfo: ClubInfo = {
  name: "Chorley Wildcats",
  tagline: "Unleash Your Potential, Join the Pack!",
  mission: "To inspire young athletes in Chorley to build confidence, teamwork skills, and a lifelong love for sports in a safe, fun, and energetic environment.",
  aboutText: "Founded in 2020, Chorley Wildcats is a community-focused sports club dedicated to children aged 5-14. We offer weekly training sessions, friendly weekend matches, and holiday camps across multiple sports, including Football, Basketball, Athletics, and Dodgeball. Our qualified coaches focus not just on skills, but on sportsmanship, healthy habits, and making great friends.",
  stats: [
    { label: "Active Wildcats", value: "150+" },
    { label: "Expert Coaches", value: "8" },
    { label: "Sports Offered", value: "4" },
    { label: "Trophies Won", value: "12" }
  ],
  contact: {
    email: "info@chorleywildcats.org.uk",
    phone: "01257 555123",
    address: "Chorley Community Sports Centre, Park Rd, Chorley PR7 1QS",
    facebook: "facebook.com/chorleywildcats"
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
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013B?auto=format&fit=crop&w=800&q=80",
    title: "Saturday Soccer Drills",
    description: "Our young Wildcats developing dribbling skills and speed on the turf."
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=800&q=80",
    title: "Basketball Hoop Shoot",
    description: "Learning the fundamentals of shooting, passing, and teamwork in the hall."
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1502224562085-639556652f33?auto=format&fit=crop&w=800&q=80",
    title: "Athletics Relay Fun",
    description: "Wildcats dash! Building speed, agility, and sports coordination."
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&w=800&q=80",
    title: "The Winning Teampack",
    description: "Celebrating teamwork, friendship, and effort at the end of training."
  }
];
