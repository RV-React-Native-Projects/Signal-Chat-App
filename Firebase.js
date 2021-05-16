import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let firebaseConfig = {
	apiKey: 'AIzaSyDbYSjWLPQHiDv3JGHC5d24X_mpoKiMnVE',
	authDomain: 'signal-app-rn.firebaseapp.com',
	projectId: 'signal-app-rn',
	storageBucket: 'signal-app-rn.appspot.com',
	messagingSenderId: '96970584292',
	appId: '1:96970584292:web:4db6014ab90715d9b1bcf1'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// let app;

// if (firebase.app.length == 0) {
// 	app = firebase.initializeApp(firebaseConfig);
// } else {
// 	app = firebase.app();
// }

export const db = app.firestore();
export const auth = firebase.auth();
