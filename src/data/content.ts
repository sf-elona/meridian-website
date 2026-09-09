import {
  Cpu,
  Lightbulb,
  Thermometer,
  Speaker,
  Waves,
  Dumbbell,
  Gamepad2,
  Baby,
  Building2,
  Briefcase,
  Footprints,
  Zap,
  Flower2,
  Clapperboard,
  Dog,
  ShieldCheck,
  GraduationCap,
  Plane,
  TrainFront,
  Cross,
} from 'lucide-react';

const B = import.meta.env.BASE_URL; // './' in the single-file build, '/' when served

export const ASSETS = {
  heroVideo: `${B}videos/Skyscraper_constructs_itself.mp4`,
  apartmentVideo: `${B}videos/Luxury_apartment_walkthrough.mp4`,
  amenityVideo: `${B}videos/Luxury_amenity_showcase.mp4`,
  facilitiesVideo: `${B}videos/Premium_facilities.mp4`,
  skyscraper: `${B}images/Skyscraper.jpeg`,
  livingRoom: `${B}images/Luxury_living_room.jpeg`,
  pool: `${B}images/Infinity_pool.jpeg`,
  clubhouse: `${B}images/Luxury_clubhouse.jpeg`,
} as const;

export const SMART_HOME = [
  { icon: Speaker, label: 'Alexa', note: 'Voice-native' },
  { icon: Cpu, label: 'Google Home', note: 'One ecosystem' },
  { icon: Lightbulb, label: 'Smart Lighting', note: 'Circadian scenes' },
  { icon: Thermometer, label: 'Climate Control', note: 'Zoned per room' },
];

export const AMENITIES = [
  {
    label: 'Pool',
    desc: 'A 40-metre infinity edge suspended above the canopy.',
    icon: Waves,
  },
  {
    label: 'Gym',
    desc: 'Technogym floor with strength bays facing the city.',
    icon: Dumbbell,
  },
  {
    label: 'Indoor Games',
    desc: 'Billiards, simulator golf and a private card room.',
    icon: Gamepad2,
  },
  {
    label: 'Kids Area',
    desc: 'A soft-architecture play world and creative studio.',
    icon: Baby,
  },
];

export const COMMUNITY = [
  { label: 'Clubhouse', icon: Building2 },
  { label: 'Business Lounge', icon: Briefcase },
  { label: 'Walking Trails', icon: Footprints },
  { label: 'EV Charging', icon: Zap },
  { label: 'Yoga Deck', icon: Flower2 },
  { label: 'Mini Theatre', icon: Clapperboard },
  { label: 'Pet Park', icon: Dog },
  { label: 'Security', icon: ShieldCheck },
];

export const STATS = [
  { value: 80, unit: '+', unitKind: 'sym', label: 'Amenities' },
  { value: 3, unit: 'Acres', unitKind: 'word', label: 'Landscaping' },
  { value: 24, unit: '×7', unitKind: 'sym', label: 'Security' },
  { value: 100, unit: '%', unitKind: 'sym', label: 'Smart Homes' },
] as const;

export const LOCATION = [
  { label: 'International Schools', meta: '6 min', icon: GraduationCap },
  { label: 'Metro Interchange', meta: '4 min', icon: TrainFront },
  { label: 'Global Airport', meta: '22 min', icon: Plane },
  { label: 'Medical Institute', meta: '8 min', icon: Cross },
];

export const TESTIMONIALS = [
  {
    quote:
      'It does not feel like a building. It feels like the architects designed the light first and the walls afterwards.',
    name: 'Ananya Rao',
    role: 'Resident, 41st floor',
  },
  {
    quote:
      'We have lived on three continents. This is the first home our children ask to come back to.',
    name: 'Marcus Vieira',
    role: 'Resident, Sky Villa 04',
  },
  {
    quote:
      'The restraint is the luxury. Nothing shouts, and somehow everything feels considered.',
    name: 'Leïla Haddad',
    role: 'Resident, 33rd floor',
  },
];
