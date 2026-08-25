export type Condition = 'New' | 'Like New' | 'Excellent' | 'Good' | 'Fair';

export type Availability = 'Available today' | 'Available this week' | 'Booked' | 'Limited slots';

export type BookingStatus = 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled' | 'completed';

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  type?: 'product' | 'borrower-to-lender' | 'lender-to-borrower';
}

export interface Lender {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  totalListings: number;
  memberSince: string;
  verified: boolean;
  responseTime: string;
  bio?: string;
  location?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
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
  lender: Lender;
  reviews: Review[];
  deliveryOptions: string[];
  buyAfterBorrowing: boolean;
  creditTowardPurchase: number;
  tags?: string[];
  views?: number;
  createdAt?: string;
}

export interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface Booking {
  id: string;
  productId: string;
  borrowerId: string;
  borrowerName: string;
  borrowerAvatar: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  securityDeposit: number;
  deliveryMethod: string;
  status: BookingStatus;
  wantsToBuy: boolean;
  buyCreditApplied: number;
  productName?: string;
  productImage?: string;
  days: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  productId?: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  displayName: string;
  avatar: string;
  bio: string;
  location: string;
  phone: string;
  verified: boolean;
  isLender: boolean;
  totalListings: number;
  totalBorrows: number;
  rating: number;
  responseTime: string;
  memberSince: string;
}
