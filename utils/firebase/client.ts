import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import firebaseConfig from '@/firebase.config'

const app =
  firebase.apps.length > 0
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig)

const db = app.firestore()
const githubAuthProvider = new firebase.auth.GithubAuthProvider()

export { app, db, githubAuthProvider }
