import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDP0qWFqSRseYNJE1dkznMU_Ri27x6iuJE',
  authDomain: 'devgram-e991b.firebaseapp.com',
  projectId: 'devgram-e991b',
  storageBucket: 'devgram-e991b.appspot.com',
  messagingSenderId: '1006827916180',
  appId: '1:1006827916180:web:75ad21f7f7e39532e05d81',
  measurementId: 'G-CLM3YVWVEP',
}

const app =
  firebase.apps.length > 0
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig)

const db = app.firestore()
const githubAuthProvider = new firebase.auth.GithubAuthProvider()

export { app, db, githubAuthProvider }
