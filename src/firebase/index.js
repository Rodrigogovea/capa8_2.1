import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDbjvL7028jvXtWJ1U_j-to20rY2WOBlVo',
  authDomain: 'capa8-react-app.firebaseapp.com',
  databaseURL: 'https://capa8-react-app.firebaseio.com',
  projectId: 'capa8-react-app',
  storageBucket: 'capa8-react-app.appspot.com',
  messagingSenderId: '952861858669',
  appId: '1:952861858669:web:69c2e9d328b8fa88005864'
};

export const fb = firebase.initializeApp(firebaseConfig);
const baseDb = fb.firestore();
export const db = baseDb;
