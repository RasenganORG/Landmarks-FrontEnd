import { useOutlet } from 'react-router-dom';

export default function Home() {
  const outlet = useOutlet();

  if (outlet) return <>{outlet}</>;

  return <div>Lading page with information about how to use the app</div>;
}
