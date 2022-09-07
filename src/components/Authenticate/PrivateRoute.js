import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useState } from 'react';

let isAuth = auth.currentUser;

export default function PrivateRoute({ children }) {
  const location = useLocation();
  const [user, setUser] = useState();
  // const isAuth = useSelector((state) => state.user.user);

  // const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   if (loading) return;
  //   if (user) {
  //     isAuth = true;
  //     console.log(user);
  //   }
  // }, [user, loading]);

  console.log(isAuth);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return user ? (
    children
  ) : (
    <Navigate
      replace={true}
      to='/login'
      state={{ from: `${location.pathname}${location.search}` }}
    />
  );
}
