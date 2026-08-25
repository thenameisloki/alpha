import { RouterProvider, useRouter } from '@/router';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { BrowsePage } from '@/pages/BrowsePage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { ListItemPage } from '@/pages/ListItemPage';
import { TrustPage } from '@/pages/TrustPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { DashboardPage } from '@/pages/DashboardPage';

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
    default:
      return <HomePage />;
  }
}

function App() {
  return (
    <RouterProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
        <Navbar />
        <main className="flex-1">
          <Pages />
        </main>
        <Footer />
      </div>
    </RouterProvider>
  );
}

export default App;
