import { Outlet, useOutlet } from 'react-router-dom';

export default function LandingPage() {
  const outlet = useOutlet();

  if (outlet) return <Outlet />;

  return <div>Lading page with information about how to use the app</div>;
}
