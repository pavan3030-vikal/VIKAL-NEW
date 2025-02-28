import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAdSXt3mQj_WfblNvuR1t1-J8gsZqqWPuI",
    authDomain: "vikal-f5819.firebaseapp.com",
    projectId: "vikal-f5819",
    storageBucket: "vikal-f5819.firebasestorage.app",
    messagingSenderId: "375179097610",
    appId: "1:375179097610:web:f994e4be0b2c4d263d11f3",
    measurementId: "G-2TKGTZC6WW"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };