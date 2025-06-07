import { initializeApp } from 'firebase/app';
     import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

     const firebaseConfig = {
        apiKey: "AIzaSyBWm2SMuJNWgqXiHTyW3zk8TxMKgdes600",
        authDomain: "testsite-eb29a.firebaseapp.com",
        projectId: "testsite-eb29a",
        storageBucket: "testsite-eb29a.firebasestorage.app",
        messagingSenderId: "2626394113",
        appId: "1:2626394113:web:fac6c64591cc2590610800",
        measurementId: "G-LYWW6ZWX3Q"
        };

     const app = initializeApp(firebaseConfig);
     const auth = getAuth(app);
     const googleProvider = new GoogleAuthProvider();

     export { auth, googleProvider, signInWithPopup };
     