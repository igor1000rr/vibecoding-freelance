export interface Freelancer {
  id: string;
  username: string;
  name: string;
  avatar: string;
  title: string;
  rating: number;
  reviewCount: number;
  ordersCompleted: number;
  responseTime: string;
  isOnline: boolean;
  location: string;
  memberSince: string;
  bio: string;
  skills: string[];
  successRate: number;
  level: 'new' | 'verified' | 'pro';
}

export interface GigPackage {
  name: string;
  price: number;
  deliveryDays: number;
  description: string;
  features: string[];
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  images: string[];
  freelancer: Freelancer;
  rating: number;
  reviewCount: number;
  ordersCount: number;
  tags: string[];
  category: string;
  categorySlug: string;
  packages: {
    economy: GigPackage;
    standard: GigPackage;
    premium: GigPackage;
  };
  isFeatured: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  gigCount: number;
  description: string;
}

export interface Order {
  id: string;
  gigTitle: string;
  freelancerName: string;
  freelancerAvatar: string;
  status: 'new' | 'in_progress' | 'delivered' | 'completed';
  date: string;
  price: number;
  packageType: string;
}

export interface Message {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}
