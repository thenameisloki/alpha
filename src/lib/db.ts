import { PGlite } from '@electric-sql/pglite';
import { seedProducts } from '@/data/seed';
import type { Product, CategoryInfo, Review } from '@/data/types';

let dbInstance: PGlite | null = null;
let initPromise: Promise<PGlite> | null = null;

const SCHEMA = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#10B981',
  bg_color TEXT NOT NULL DEFAULT '#ecfdf5',
  sort_order INT NOT NULL DEFAULT 0,
  item_count INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  condition TEXT NOT NULL DEFAULT 'Good',
  images TEXT[] NOT NULL DEFAULT '{}',
  specifications JSONB NOT NULL DEFAULT '{}',
  price_per_day NUMERIC(10,2) NOT NULL DEFAULT 0,
  price_per_week NUMERIC(10,2) NOT NULL DEFAULT 0,
  security_deposit NUMERIC(10,2) NOT NULL DEFAULT 0,
  purchase_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  availability TEXT NOT NULL DEFAULT 'Available today',
  buy_after_borrow BOOLEAN NOT NULL DEFAULT true,
  credit_toward_purchase INT NOT NULL DEFAULT 100,
  delivery_options TEXT[] NOT NULL DEFAULT '{}',
  location TEXT,
  distance_km NUMERIC(6,1) NOT NULL DEFAULT 0,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  review_count INT NOT NULL DEFAULT 0,
  successful_borrows INT NOT NULL DEFAULT 0,
  views INT NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lenders (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  total_listings INT NOT NULL DEFAULT 0,
  member_since TEXT NOT NULL DEFAULT '2024',
  verified BOOLEAN NOT NULL DEFAULT true,
  response_time TEXT NOT NULL DEFAULT 'Within a few hours',
  bio TEXT,
  location TEXT
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  avatar TEXT,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  date TEXT NOT NULL,
  comment TEXT NOT NULL,
  review_type TEXT NOT NULL DEFAULT 'product'
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  borrower_id TEXT NOT NULL,
  borrower_name TEXT NOT NULL,
  borrower_avatar TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  days INT NOT NULL DEFAULT 1,
  total_cost NUMERIC(10,2) NOT NULL DEFAULT 0,
  security_deposit NUMERIC(10,2) NOT NULL DEFAULT 0,
  delivery_method TEXT NOT NULL DEFAULT 'Pickup',
  status TEXT NOT NULL DEFAULT 'pending',
  wants_to_buy BOOLEAN NOT NULL DEFAULT false,
  buy_credit_applied NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  sender_avatar TEXT,
  receiver_id TEXT NOT NULL,
  receiver_name TEXT NOT NULL,
  product_id TEXT,
  body TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  avatar TEXT,
  bio TEXT,
  location TEXT,
  phone TEXT,
  verified BOOLEAN NOT NULL DEFAULT false,
  is_lender BOOLEAN NOT NULL DEFAULT true,
  total_listings INT NOT NULL DEFAULT 0,
  total_borrows INT NOT NULL DEFAULT 0,
  rating NUMERIC(3,2) NOT NULL DEFAULT 0,
  response_time TEXT NOT NULL DEFAULT 'Within a few hours',
  member_since TEXT NOT NULL DEFAULT '2024'
);
`;

const CATEGORIES: Omit<CategoryInfo, 'count'>[] = [
  { id: 1, name: 'Electronics', slug: 'electronics', icon: 'Laptop', color: '#3B82F6', bgColor: '#eff6ff', sort_order: 1 },
  { id: 2, name: 'Cameras', slug: 'cameras', icon: 'Camera', color: '#8B5CF6', bgColor: '#f5f3ff', sort_order: 2 },
  { id: 3, name: 'Tools', slug: 'tools', icon: 'Wrench', color: '#F97316', bgColor: '#fff7ed', sort_order: 3 },
  { id: 4, name: 'Fitness', slug: 'fitness', icon: 'Dumbbell', color: '#EF4444', bgColor: '#fef2f2', sort_order: 4 },
  { id: 5, name: 'Outdoor & Camping', slug: 'outdoor-camping', icon: 'Tent', color: '#10B981', bgColor: '#ecfdf5', sort_order: 5 },
  { id: 6, name: 'Baby & Kids', slug: 'baby-kids', icon: 'Baby', color: '#EC4899', bgColor: '#fdf2f8', sort_order: 6 },
  { id: 7, name: 'Fashion', slug: 'fashion', icon: 'ShoppingBag', color: '#A855F7', bgColor: '#faf5ff', sort_order: 7 },
  { id: 8, name: 'Home & Kitchen', slug: 'home-kitchen', icon: 'CookingPot', color: '#F59E0B', bgColor: '#fffbeb', sort_order: 8 },
  { id: 9, name: 'Beauty', slug: 'beauty', icon: 'Sparkles', color: '#06B6D4', bgColor: '#ecfeff', sort_order: 9 },
  { id: 10, name: 'Hobbies', slug: 'hobbies', icon: 'Guitar', color: '#84CC16', bgColor: '#f7fee7', sort_order: 10 },
  { id: 11, name: 'Vehicles', slug: 'vehicles', icon: 'Bike', color: '#6366F1', bgColor: '#eef2ff', sort_order: 11 },
  { id: 12, name: 'Party & Events', slug: 'party-events', icon: 'PartyPopper', color: '#F43F5E', bgColor: '#fff1f2', sort_order: 12 },
];

export async function getDb(): Promise<PGlite> {
  if (dbInstance) return dbInstance;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const db = new PGlite('idb://lendora-db');
    await db.exec(SCHEMA);

    // Seed categories
    for (const cat of CATEGORIES) {
      await db.query(
        `INSERT INTO categories (id, name, slug, icon, color, bg_color, sort_order, item_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 0)
         ON CONFLICT (name) DO NOTHING`,
        [cat.id, cat.name, cat.slug, cat.icon, cat.color, cat.bgColor, cat.sort_order]
      );
    }

    // Check if products already seeded
    const existing = await db.query('SELECT COUNT(*) as cnt FROM products');
    const count = (existing.rows[0] as any).cnt;
    if (count === 0 || count === '0') {
      await seedDatabase(db);
    }

    dbInstance = db;
    return db;
  })();

  return initPromise;
}

async function seedDatabase(db: PGlite) {
  for (const p of seedProducts) {
    await db.query(
      `INSERT INTO products (id, name, description, category, condition, images, specifications,
        price_per_day, price_per_week, security_deposit, purchase_price, availability,
        buy_after_borrow, credit_toward_purchase, delivery_options, location, distance_km,
        rating, review_count, successful_borrows, views, tags, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, true)
       ON CONFLICT (id) DO NOTHING`,
      [
        p.id, p.name, p.description, p.category, p.condition,
        p.images, JSON.stringify(p.specifications),
        p.pricePerDay, p.pricePerWeek, p.securityDeposit, p.purchasePrice,
        p.availability, p.buyAfterBorrowing, p.creditTowardPurchase,
        p.deliveryOptions, p.location, p.distanceKm,
        p.rating, p.reviewCount, p.successfulBorrows, p.views || 0, p.tags || []
      ]
    );

    // Seed lender
    await db.query(
      `INSERT INTO lenders (id, name, avatar, rating, total_listings, member_since, verified, response_time, bio, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       ON CONFLICT (id) DO NOTHING`,
      [p.lender.id, p.lender.name, p.lender.avatar, p.lender.rating, p.lender.totalListings, p.lender.memberSince, p.lender.verified, p.lender.responseTime, p.lender.bio || '', p.lender.location || p.location]
    );

    // Seed reviews
    for (const r of p.reviews) {
      await db.query(
        `INSERT INTO reviews (id, product_id, author, avatar, rating, date, comment, review_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [r.id, p.id, r.author, r.avatar, r.rating, r.date, r.comment, r.type || 'product']
      );
    }
  }

  // Update category counts
  await db.query(`
    UPDATE categories SET item_count = sub.cnt
    FROM (SELECT category, COUNT(*) as cnt FROM products WHERE is_active = true GROUP BY category) sub
    WHERE categories.name = sub.category
  `);
}

// ============ Query API ============

function rowToProduct(row: any, lender?: any, reviews?: Review[]): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description || '',
    category: row.category,
    condition: row.condition,
    images: row.images || [],
    specifications: typeof row.specifications === 'string' ? JSON.parse(row.specifications) : (row.specifications || {}),
    pricePerDay: Number(row.price_per_day),
    pricePerWeek: Number(row.price_per_week),
    securityDeposit: Number(row.security_deposit),
    purchasePrice: Number(row.purchase_price),
    availability: row.availability,
    buyAfterBorrowing: row.buy_after_borrow,
    creditTowardPurchase: row.credit_toward_purchase,
    deliveryOptions: row.delivery_options || [],
    location: row.location || '',
    distanceKm: Number(row.distance_km),
    rating: Number(row.rating),
    reviewCount: row.review_count,
    successfulBorrows: row.successful_borrows,
    views: row.views,
    tags: row.tags || [],
    lender: lender || {
      id: 'unknown',
      name: 'Unknown',
      avatar: '',
      rating: 0,
      totalListings: 0,
      memberSince: '2024',
      verified: false,
      responseTime: 'Unknown',
    },
    reviews: reviews || [],
  };
}

export async function fetchProducts(filters?: {
  category?: string;
  search?: string;
  maxPrice?: number;
  sortBy?: 'recommended' | 'price-low' | 'price-high' | 'rating' | 'distance' | 'popular';
}): Promise<Product[]> {
  const db = await getDb();
  let query = 'SELECT * FROM products WHERE is_active = true';
  const params: any[] = [];
  let paramIdx = 1;

  if (filters?.category) {
    query += ` AND category = $${paramIdx++}`;
    params.push(filters.category);
  }
  if (filters?.search) {
    query += ` AND (name ILIKE $${paramIdx} OR description ILIKE $${paramIdx} OR category ILIKE $${paramIdx} OR location ILIKE $${paramIdx})`;
    params.push(`%${filters.search}%`);
    paramIdx++;
  }
  if (filters?.maxPrice) {
    query += ` AND price_per_day <= $${paramIdx++}`;
    params.push(filters.maxPrice);
  }

  switch (filters?.sortBy) {
    case 'price-low': query += ' ORDER BY price_per_day ASC'; break;
    case 'price-high': query += ' ORDER BY price_per_day DESC'; break;
    case 'rating': query += ' ORDER BY rating DESC'; break;
    case 'distance': query += ' ORDER BY distance_km ASC'; break;
    case 'popular': query += ' ORDER BY successful_borrows DESC'; break;
    default: query += ' ORDER BY rating DESC, successful_borrows DESC';
  }

  const result = await db.query(query, params);
  const products: Product[] = [];

  for (const row of result.rows) {
    const lenderRes = await db.query('SELECT * FROM lenders WHERE id = $1', [(row as any).id + '-lender']);
    const reviewsRes = await db.query('SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC', [(row as any).id]);

    let lender = undefined;
    if (lenderRes.rows.length > 0) {
      const lr = lenderRes.rows[0] as any;
      lender = {
        id: lr.id,
        name: lr.name,
        avatar: lr.avatar,
        rating: Number(lr.rating),
        totalListings: lr.total_listings,
        memberSince: lr.member_since,
        verified: lr.verified,
        responseTime: lr.response_time,
        bio: lr.bio,
        location: lr.location,
      };
    }

    const reviews: Review[] = reviewsRes.rows.map((r: any) => ({
      id: r.id,
      author: r.author,
      avatar: r.avatar,
      rating: r.rating,
      date: r.date,
      comment: r.comment,
      type: r.review_type,
    }));

    products.push(rowToProduct(row, lender, reviews));
  }

  return products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const db = await getDb();
  const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  const lenderRes = await db.query('SELECT * FROM lenders WHERE id = $1', [id + '-lender']);
  const reviewsRes = await db.query('SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC', [id]);

  let lender = undefined;
  if (lenderRes.rows.length > 0) {
    const lr = lenderRes.rows[0] as any;
    lender = {
      id: lr.id,
      name: lr.name,
      avatar: lr.avatar,
      rating: Number(lr.rating),
      totalListings: lr.total_listings,
      memberSince: lr.member_since,
      verified: lr.verified,
      responseTime: lr.response_time,
      bio: lr.bio,
      location: lr.location,
    };
  }

  const reviews: Review[] = reviewsRes.rows.map((r: any) => ({
    id: r.id,
    author: r.author,
    avatar: r.avatar,
    rating: r.rating,
    date: r.date,
    comment: r.comment,
    type: r.review_type,
  }));

  // Increment views
  await db.query('UPDATE products SET views = views + 1 WHERE id = $1', [id]);

  return rowToProduct(row, lender, reviews);
}

export async function fetchCategories(): Promise<CategoryInfo[]> {
  const db = await getDb();
  const result = await db.query('SELECT * FROM categories ORDER BY sort_order ASC');
  return result.rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    icon: r.icon,
    color: r.color,
    bgColor: r.bg_color,
    count: r.item_count,
  }));
}

export async function createBooking(booking: {
  id: string;
  productId: string;
  borrowerId: string;
  borrowerName: string;
  borrowerAvatar: string;
  startDate: string;
  endDate: string;
  days: number;
  totalCost: number;
  securityDeposit: number;
  deliveryMethod: string;
  wantsToBuy: boolean;
  buyCreditApplied: number;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO bookings (id, product_id, borrower_id, borrower_name, borrower_avatar,
      start_date, end_date, days, total_cost, security_deposit, delivery_method, status, wants_to_buy, buy_credit_applied)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending', $12, $13)`,
    [booking.id, booking.productId, booking.borrowerId, booking.borrowerName, booking.borrowerAvatar,
     booking.startDate, booking.endDate, booking.days, booking.totalCost, booking.securityDeposit,
     booking.deliveryMethod, booking.wantsToBuy, booking.buyCreditApplied]
  );
}

export async function fetchBookings(userId: string): Promise<any[]> {
  const db = await getDb();
  const result = await db.query('SELECT * FROM bookings WHERE borrower_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
}

export async function toggleFavorite(userId: string, productId: string): Promise<boolean> {
  const db = await getDb();
  const existing = await db.query('SELECT id FROM favorites WHERE user_id = $1 AND product_id = $2', [userId, productId]);
  if (existing.rows.length > 0) {
    await db.query('DELETE FROM favorites WHERE user_id = $1 AND product_id = $2', [userId, productId]);
    return false;
  }
  await db.query('INSERT INTO favorites (id, user_id, product_id) VALUES ($1, $2, $3)', [crypto.randomUUID(), userId, productId]);
  return true;
}

export async function fetchFavorites(userId: string): Promise<string[]> {
  const db = await getDb();
  const result = await db.query('SELECT product_id FROM favorites WHERE user_id = $1', [userId]);
  return result.rows.map((r: any) => r.product_id);
}

export async function createProduct(data: {
  id: string;
  name: string;
  description: string;
  category: string;
  condition: string;
  images: string[];
  specifications: Record<string, string>;
  pricePerDay: number;
  pricePerWeek: number;
  securityDeposit: number;
  purchasePrice: number;
  deliveryOptions: string[];
  location: string;
  tags?: string[];
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO products (id, name, description, category, condition, images, specifications,
      price_per_day, price_per_week, security_deposit, purchase_price, delivery_options,
      location, distance_km, tags, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 0, $14, true)`,
    [data.id, data.name, data.description, data.category, data.condition,
     data.images, JSON.stringify(data.specifications),
     data.pricePerDay, data.pricePerWeek, data.securityDeposit, data.purchasePrice,
     data.deliveryOptions, data.location, data.tags || []]
  );
}

export async function createMessage(msg: {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  receiverName: string;
  productId?: string;
  body: string;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO messages (id, sender_id, sender_name, sender_avatar, receiver_id, receiver_name, product_id, body, read)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, false)`,
    [msg.id, msg.senderId, msg.senderName, msg.senderAvatar, msg.receiverId, msg.receiverName, msg.productId, msg.body]
  );
}

export async function fetchMessages(userId: string): Promise<any[]> {
  const db = await getDb();
  const result = await db.query(
    'SELECT * FROM messages WHERE sender_id = $1 OR receiver_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

export async function addReview(review: {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  type?: string;
}): Promise<void> {
  const db = await getDb();
  await db.query(
    `INSERT INTO reviews (id, product_id, author, avatar, rating, date, comment, review_type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [review.id, review.productId, review.author, review.avatar, review.rating, review.date, review.comment, review.type || 'product']
  );
}

export async function getProductStats() {
  const db = await getDb();
  const productCount = await db.query('SELECT COUNT(*) as cnt FROM products WHERE is_active = true');
  const borrowCount = await db.query('SELECT COALESCE(SUM(successful_borrows), 0) as total FROM products');
  const avgRating = await db.query('SELECT AVG(rating) as avg FROM products');
  const totalSavings = await db.query('SELECT COALESCE(SUM(purchase_price - price_per_day * 3), 0) as savings FROM products');

  return {
    productCount: Number((productCount.rows[0] as any).cnt),
    borrowCount: Number((borrowCount.rows[0] as any).total),
    avgRating: Number((avgRating.rows[0] as any).avg || 0).toFixed(1),
    totalSavings: Number((totalSavings.rows[0] as any).savings),
  };
}
