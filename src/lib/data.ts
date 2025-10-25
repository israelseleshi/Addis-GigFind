// Mock data for Addis GigFind

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'freelancer' | 'client';
  location: string;
  rating: number;
  avatar: string;
  about?: string;
  skills?: string[];
  completedGigs?: number;
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  date: string;
  clientId: string;
  clientName: string;
  clientRating: number;
  clientAvatar: string;
  skills: string[];
  status: 'open' | 'in-progress' | 'completed';
  applicants?: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: Date;
  unread: number;
}

export interface Review {
  id: string;
  gigId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Abebe Kebede',
    email: 'abebe@example.com',
    role: 'freelancer',
    location: 'Bole, Addis Ababa',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Abebe',
    about: 'Professional photographer with 5 years experience in events and portraits',
    skills: ['Photography', 'Videography', 'Photo Editing'],
    completedGigs: 47
  },
  {
    id: '2',
    name: 'Meron Tadesse',
    email: 'meron@example.com',
    role: 'client',
    location: 'Piazza, Addis Ababa',
    rating: 4.9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meron',
    completedGigs: 12
  },
  {
    id: '3',
    name: 'Solomon Haile',
    email: 'solomon@example.com',
    role: 'freelancer',
    location: 'Lideta, Addis Ababa',
    rating: 4.7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Solomon',
    about: 'Experienced tutor specializing in Mathematics and Physics',
    skills: ['Math Tutoring', 'Physics', 'Online Teaching'],
    completedGigs: 63
  },
  {
    id: '4',
    name: 'Tigist Alemu',
    email: 'tigist@example.com',
    role: 'freelancer',
    location: 'Bole, Addis Ababa',
    rating: 5.0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tigist',
    about: 'Graphic designer and brand consultant',
    skills: ['Graphic Design', 'Branding', 'Illustration'],
    completedGigs: 89
  }
];

// Mock gigs
export const mockGigs: Gig[] = [
  {
    id: '1',
    title: 'Wedding Photography Needed',
    description: 'Looking for a professional photographer for my wedding ceremony on November 15th. Need full day coverage including ceremony and reception at Skylight Hotel.',
    category: 'Photography',
    budget: 8000,
    location: 'Bole, Addis Ababa',
    date: '2025-11-15',
    clientId: '2',
    clientName: 'Meron Tadesse',
    clientRating: 4.9,
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meron',
    skills: ['Photography', 'Event Coverage', 'Portrait'],
    status: 'open',
    applicants: 5
  },
  {
    id: '2',
    title: 'Math Tutor for Grade 12 Student',
    description: 'Need an experienced math tutor for my son preparing for university entrance exams. 3 sessions per week, flexible timing.',
    category: 'Tutoring',
    budget: 2500,
    location: 'Piazza, Addis Ababa',
    date: '2025-10-25',
    clientId: '2',
    clientName: 'Yohannes Tesfaye',
    clientRating: 4.6,
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yohannes',
    skills: ['Mathematics', 'Teaching', 'Exam Prep'],
    status: 'open',
    applicants: 8
  },
  {
    id: '3',
    title: 'Logo Design for Coffee Shop',
    description: 'Starting a new coffee shop in Bole and need a modern, professional logo that reflects Ethiopian coffee culture. Looking for 3 concepts to choose from.',
    category: 'Design',
    budget: 3500,
    location: 'Bole, Addis Ababa',
    date: '2025-10-30',
    clientId: '2',
    clientName: 'Samuel Bekele',
    clientRating: 4.8,
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel',
    skills: ['Graphic Design', 'Logo Design', 'Branding'],
    status: 'open',
    applicants: 12
  },
  {
    id: '4',
    title: 'Event Setup Help Needed',
    description: 'Need 2-3 people to help set up chairs, tables, and decorations for a corporate event. Work will take about 4 hours.',
    category: 'Event Help',
    budget: 1200,
    location: 'Lideta, Addis Ababa',
    date: '2025-10-28',
    clientId: '2',
    clientName: 'Hanna Girma',
    clientRating: 4.7,
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hanna',
    skills: ['Event Setup', 'Physical Work', 'Team Work'],
    status: 'open',
    applicants: 3
  },
  {
    id: '5',
    title: 'Website Development for Small Business',
    description: 'Looking for a web developer to create a simple 5-page website for my import/export business. Need contact forms and product gallery.',
    category: 'Web Development',
    budget: 15000,
    location: 'Bole, Addis Ababa',
    date: '2025-11-05',
    clientId: '2',
    clientName: 'Dawit Mengistu',
    clientRating: 4.5,
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit',
    skills: ['Web Development', 'HTML/CSS', 'JavaScript'],
    status: 'open',
    applicants: 7
  },
  {
    id: '6',
    title: 'English Language Tutoring',
    description: 'Need an English tutor for conversational English practice. 2 sessions per week, each 1.5 hours. Prefer native or fluent speaker.',
    category: 'Tutoring',
    budget: 2000,
    location: 'Kirkos, Addis Ababa',
    date: '2025-10-26',
    clientId: '2',
    clientName: 'Bethlehem Yonas',
    clientRating: 4.9,
    clientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bethlehem',
    skills: ['English Teaching', 'Conversation', 'Language'],
    status: 'open',
    applicants: 6
  }
];

// Mock categories
export const categories = [
  'Photography',
  'Tutoring',
  'Design',
  'Event Help',
  'Web Development',
  'Writing',
  'Translation',
  'Repair & Maintenance',
  'Driving',
  'Cooking',
  'Cleaning',
  'Other'
];

// Mock locations in Addis Ababa
export const addisLocations = [
  'Bole',
  'Piazza',
  'Lideta',
  'Kirkos',
  'Arada',
  'Yeka',
  'Nifas Silk-Lafto',
  'Kolfe Keranio',
  'Gulele',
  'Akaky Kaliti'
];

// Mock testimonials
export const testimonials = [
  {
    id: '1',
    name: 'Henok Asfaw',
    role: 'Client',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henok',
    comment: 'Found the perfect photographer for my daughter\'s graduation. The platform is so easy to use!',
    rating: 5
  },
  {
    id: '2',
    name: 'Selamawit Desta',
    role: 'Freelancer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selamawit',
    comment: 'I\'ve been getting consistent gigs through Addis GigFind. It\'s transformed my freelance business.',
    rating: 5
  },
  {
    id: '3',
    name: 'Tedros Wolde',
    role: 'Client',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tedros',
    comment: 'Quick, reliable, and affordable. Found a great tutor for my kids within hours!',
    rating: 5
  }
];

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    gigId: '1',
    reviewerId: '2',
    reviewerName: 'Meron Tadesse',
    reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meron',
    rating: 5,
    comment: 'Excellent work! Very professional and delivered exactly what we needed.',
    date: '2025-09-20'
  },
  {
    id: '2',
    gigId: '2',
    reviewerId: '3',
    reviewerName: 'Solomon Haile',
    reviewerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Solomon',
    rating: 5,
    comment: 'Great communication and punctual. Would definitely hire again!',
    date: '2025-09-18'
  }
];
