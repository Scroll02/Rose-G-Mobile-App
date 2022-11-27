import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAME_fl_N_dUc92icQlZgcC-hPt4DEw7ys',
  authDomain: 'rose-g-2537e.firebaseapp.com',
  projectId: 'rose-g-2537e',
  storageBucket: 'rose-g-2537e.appspot.com',
  messagingSenderId: '673208411180',
  appId: '1:673208411180:web:d5316c64f155303772dd89',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .settings({experimentalForceLongPolling: true, merge: true});
}

export {firebase};
