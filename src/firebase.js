import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const {
  VITE_app_id,
  VITE_sender_id,
  VITE_storage_bucket,
  VITE_project_id,
  VITE_Auth_domain,
  VITE_api_key
} = import.meta.env;


const firebaseConfig = {
  apiKey: VITE_api_key,
  authDomain: VITE_Auth_domain,
  projectId: VITE_project_id,
  storageBucket: VITE_storage_bucket,
  messagingSenderId: VITE_sender_id,
  appId: VITE_app_id
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);