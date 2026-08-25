import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'browse'; category?: string; query?: string }
  | { name: 'product'; id: string }
  | { name: 'list' }
  | { name: 'trust' }
  | { name: 'dashboard-borrower' }
  | { name: 'dashboard-lender' }
  | { name: 'how-it-works' }
  | { name: 'auth' }
  | { name: 'messages' }
  | { name: 'cart' }
  | { name: 'checkout' }
  | { name: 'payment' }
  | { name: 'wishlist' };

interface RouterContextValue {
  route: Route;
  navigate: (route: Route) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: 'home' });

  const navigate = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <RouterContext.Provider value={{ route, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter must be used within RouterProvider');
  return ctx;
}
