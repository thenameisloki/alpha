// Re-export static data for backward compatibility
export { seedProducts as products } from './seed';
export type { Product, CategoryInfo, Review, Condition, Availability } from './types';

export const categories = [
  { id: 1, name: 'Electronics', slug: 'electronics', icon: 'Laptop', color: '#3B82F6', bgColor: '#eff6ff', count: 1240, sort_order: 1 },
  { id: 2, name: 'Cameras', slug: 'cameras', icon: 'Camera', color: '#8B5CF6', bgColor: '#f5f3ff', count: 856, sort_order: 2 },
  { id: 3, name: 'Tools', slug: 'tools', icon: 'Wrench', color: '#F97316', bgColor: '#fff7ed', count: 642, sort_order: 3 },
  { id: 4, name: 'Fitness', slug: 'fitness', icon: 'Dumbbell', color: '#EF4444', bgColor: '#fef2f2', count: 438, sort_order: 4 },
  { id: 5, name: 'Outdoor & Camping', slug: 'outdoor-camping', icon: 'Tent', color: '#10B981', bgColor: '#ecfdf5', count: 521, sort_order: 5 },
  { id: 6, name: 'Baby & Kids', slug: 'baby-kids', icon: 'Baby', color: '#EC4899', bgColor: '#fdf2f8', count: 367, sort_order: 6 },
  { id: 7, name: 'Fashion', slug: 'fashion', icon: 'ShoppingBag', color: '#A855F7', bgColor: '#faf5ff', count: 892, sort_order: 7 },
  { id: 8, name: 'Home & Kitchen', slug: 'home-kitchen', icon: 'CookingPot', color: '#F59E0B', bgColor: '#fffbeb', count: 745, sort_order: 8 },
  { id: 9, name: 'Beauty', slug: 'beauty', icon: 'Sparkles', color: '#06B6D4', bgColor: '#ecfeff', count: 289, sort_order: 9 },
  { id: 10, name: 'Hobbies', slug: 'hobbies', icon: 'Guitar', color: '#84CC16', bgColor: '#f7fee7', count: 412, sort_order: 10 },
  { id: 11, name: 'Vehicles', slug: 'vehicles', icon: 'Bike', color: '#6366F1', bgColor: '#eef2ff', count: 198, sort_order: 11 },
  { id: 12, name: 'Party & Events', slug: 'party-events', icon: 'PartyPopper', color: '#F43F5E', bgColor: '#fff1f2', count: 334, sort_order: 12 },
];

export const tryBeforeYouBuyExamples = [
  { icon: 'Camera', product: 'Camera', message: 'See if the camera actually fits your photography style.', color: 'violet' },
  { icon: 'Table2', product: 'Standing Desk', message: 'Work with it for a week before committing.', color: 'sky' },
  { icon: 'Tent', product: 'Camping Tent', message: 'Test it outdoors before your next adventure.', color: 'emerald' },
  { icon: 'Baby', product: 'Baby Stroller', message: 'Make sure it works for your lifestyle.', color: 'rose' },
  { icon: 'Wrench', product: 'Power Tool', message: "Complete your project without buying a tool you'll rarely use.", color: 'accent' },
  { icon: 'Music', product: 'Guitar', message: 'Discover if you\'ll actually practice before investing.', color: 'teal' },
];

export const trustBadges = [
  { icon: 'ShieldCheck', title: 'Identity Verification', description: 'Every member goes through ID verification before listing or borrowing.', color: 'emerald' },
  { icon: 'BadgeCheck', title: 'Verified Profiles', description: 'Look for the verified badge on lender and borrower profiles.', color: 'sky' },
  { icon: 'Star', title: 'Ratings & Reviews', description: 'Transparent two-way ratings after every borrow transaction.', color: 'accent' },
  { icon: 'CreditCard', title: 'Secure Payments', description: 'Payments held securely and released only after successful return.', color: 'teal' },
  { icon: 'Lock', title: 'Security Deposits', description: 'Refundable deposits protect lenders and ensure responsible borrowing.', color: 'coral' },
  { icon: 'ShieldPlus', title: 'Damage Protection', description: 'Optional protection covers accidental damage up to the deposit amount.', color: 'violet' },
  { icon: 'History', title: 'Borrowing History', description: 'Every transaction is recorded to build a trusted community history.', color: 'sky' },
  { icon: 'BookOpen', title: 'Community Guidelines', description: 'Clear rules ensure a safe, respectful marketplace for everyone.', color: 'emerald' },
  { icon: 'Flag', title: 'Report an Issue', description: 'Flag any listing, user, or transaction for immediate review.', color: 'rose' },
];

export const howItWorksSteps = [
  { icon: 'Search', step: '01', title: 'Discover', description: 'Find products you want to try. Browse by category, location, or search directly.', color: 'sky' },
  { icon: 'Calendar', step: '02', title: 'Borrow', description: 'Choose a nearby lender and select your dates. Pay securely with deposit protection.', color: 'emerald' },
  { icon: 'Sparkles', step: '03', title: 'Experience', description: 'Use the product in your real life. Test it thoroughly and see if it works for you.', color: 'accent' },
  { icon: 'ShoppingBag', step: '04', title: 'Decide', description: 'Return it or buy it if you love it. Your borrowing cost can be credited toward purchase.', color: 'coral' },
];

export const colorMap: Record<string, { text: string; bg: string; bgLight: string; border: string }> = {
  emerald: { text: 'text-emerald-600', bg: 'bg-emerald-500', bgLight: 'bg-emerald-50', border: 'ring-emerald-500/20' },
  sky: { text: 'text-sky-600', bg: 'bg-sky-500', bgLight: 'bg-sky-50', border: 'ring-sky-500/20' },
  accent: { text: 'text-accent-600', bg: 'bg-accent-500', bgLight: 'bg-accent-50', border: 'ring-accent-500/20' },
  coral: { text: 'text-coral-600', bg: 'bg-coral-500', bgLight: 'bg-coral-50', border: 'ring-coral-500/20' },
  violet: { text: 'text-violet-600', bg: 'bg-violet-500', bgLight: 'bg-violet-50', border: 'ring-violet-500/20' },
  rose: { text: 'text-rose-600', bg: 'bg-rose-500', bgLight: 'bg-rose-50', border: 'ring-rose-500/20' },
  teal: { text: 'text-teal-600', bg: 'bg-teal-500', bgLight: 'bg-teal-50', border: 'ring-teal-500/20' },
};
