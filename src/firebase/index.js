import firebase from 'firebase'
import 'firebase/firebase'
import config from './config'

// import 'firebase/auth'


export const firebaseApp = firebase.initializeApp(config)


// if (!firebase.apps.length) {
//   firebase.initializeApp(config)
// }

export const db = firebase.firestore();

export const auth = firebase.auth();

export default firebaseApp;