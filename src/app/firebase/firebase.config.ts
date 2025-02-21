import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC0xgy7-rYMUiRb9juqywKuqSMG3p6QXyc',
  authDomain: 'finance-dashboard-5e2f8.firebaseapp.com',
  projectId: 'finance-dashboard-5e2f8',
  storageBucket: 'finance-dashboard-5e2f8.firebasestorage.app',
  messagingSenderId: '673271678493',
  appId: '1:673271678493:web:d9ce36d7c7bb1b3ec468f4',
  measurementId: 'G-SZW9B0VVWP',
};

const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore(app);
export const firebaseAuth = getAuth(app);
