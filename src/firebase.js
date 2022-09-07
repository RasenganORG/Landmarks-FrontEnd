import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';

const config = {
  apiKey: 'AIzaSyALMnrjPtvBa3I9qSe29eDNF37iGVcoZSA',
  authDomain: 'landmarks-api-857f8.firebaseapp.com',
  projectId: 'landmarks-api-857f8',
  storageBucket: 'landmarks-api-857f8.appspot.com',
  messagingSenderId: '139204759487',
  appId: '1:139204759487:web:7a7a7f4b90e5144e4e9b0a',
};

const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);
