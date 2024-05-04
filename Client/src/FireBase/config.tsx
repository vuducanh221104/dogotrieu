import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDeHOm50l-iPHOOPZ9_95EoTS-8PErYf4A',
    authDomain: 'dogotrieu.firebaseapp.com',
    databaseURL: 'https://dogotrieu-default-rtdb.firebaseio.com',
    projectId: 'dogotrieu',
    storageBucket: 'dogotrieu.appspot.com',
    messagingSenderId: '891489304995',
    appId: '1:891489304995:web:52af5accc2cbbeacec9a16',
    measurementId: 'G-M4G2QSTXZL',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
