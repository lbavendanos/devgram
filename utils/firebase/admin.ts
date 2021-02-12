import admin from 'firebase-admin'

const app =
  admin.apps.length > 0
    ? admin.app()
    : admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        }),
      })

const db = app.firestore()

export { app, db }
