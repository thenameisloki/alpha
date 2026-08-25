import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { useCartWishlist } from '@/lib/cart';
import { useRouter } from '@/router';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';

export function WishlistPage() {
  const { wishlist, toggleWishlist } = useCartWishlist();
  const { navigate } = useRouter();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-rose-50 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-rose-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-900 mb-3">Your wishlist is empty</h1>
          <p className="text-navy-500 mb-8">Tap the heart icon on any product to save it for later.</p>
          <button onClick={() => navigate({ name: 'browse' })} className="btn-emerald">
            Browse Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-navy-900">My Wishlist</h1>
          <p className="text-navy-500 mt-1">{wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {wishlistProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-white shadow-card flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors z-10"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
