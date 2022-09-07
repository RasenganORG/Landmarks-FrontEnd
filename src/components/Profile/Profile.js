import { useLocation } from 'react-router-dom';

export default function Profile() {
  const { state } = useLocation();
  return <div>User ID: {state}</div>;
}
