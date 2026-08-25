import { RouterProvider, useRouter } from '@/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartWishlistProvider } from '@/lib/cart';
import { HomePage } from '@/pages/HomePage';
import { BrowsePage } from '@/pages/BrowsePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ListItemPage } from '@/pages/ListItemPage';
import { TrustPage } from '@/pages/TrustPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { PaymentPage } from '@/pages/PaymentPage';
import { WishlistPage } from '@/pages/WishlistPage';

function Pages() {
  const { route } = useRouter();

  switch (route.name) {
    case 'home':
      return <HomePage />;
    case 'browse':
      return <BrowsePage initialCategory={route.category} initialQuery={route.query} />;
    case 'product':
      return <ProductDetailPage productId={route.id} />;
    case 'list':
      return <ListItemPage />;
    case 'trust':
      return <TrustPage />;
    case 'how-it-works':
      return <HowItWorksPage />;
    case 'dashboard-borrower':
      return <DashboardPage initialTab="borrower" />;
    case 'dashboard-lender':
      return <DashboardPage initialTab="lender" />;
    case 'cart':
      return <CartPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'payment':
      return <PaymentPage />;
    case 'wishlist':
      return <WishlistPage />;
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <RouterProvider>
      <CartWishlistProvider>
        <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
          <Navbar />
          <main className="flex-1">
            <Pages />
          </main>
          <Footer />
        </div>
      </CartWishlistProvider>
    </RouterProvider>
  );
}

export default App;
