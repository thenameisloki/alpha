export type Category =
  | 'Electronics'
  | 'Cameras'
  | 'Tools'
  | 'Fitness'
  | 'Outdoor & Camping'
  | 'Baby & Kids'
  | 'Fashion'
  | 'Home & Kitchen'
  | 'Beauty'
  | 'Hobbies'
  | 'Vehicles'
  | 'Party & Events';

export type Condition = 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';

export type Availability = 'Available today' | 'Available this week' | 'Booked' | 'Limited slots';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  condition: Condition;
  location: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  successfulBorrows: number;
  pricePerDay: number;
  pricePerWeek: number;
  securityDeposit: number;
  purchasePrice: number;
  availability: Availability;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  lender: {
    name: string;
    avatar: string;
    rating: number;
    totalListings: number;
    memberSince: string;
    verified: boolean;
    responseTime: string;
  };
  reviews: Review[];
  deliveryOptions: string[];
  buyAfterBorrowing: boolean;
  creditTowardPurchase: number;
}

export interface CategoryInfo {
  name: Category;
  icon: string;
  count: number;
}
