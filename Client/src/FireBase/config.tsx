import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBBjC8t4bTIop84ZDBL6eL3XGe54UAbosY',
    authDomain: 'dogotrieu-40ab8.firebaseapp.com',
    projectId: 'dogotrieu-40ab8',
    storageBucket: 'dogotrieu-40ab8.appspot.com',
    messagingSenderId: '1014195183139',
    appId: '1:1014195183139:web:bcf9103eb37c22f9341b96',
    measurementId: 'G-8T84XGM5PX',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
