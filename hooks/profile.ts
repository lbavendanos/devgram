import { useEffect, useState } from 'react'
import firebase from 'firebase'
import { Profile } from '@/types'
import { db } from '@/utils/firebase/client'

export function useProfile(user: firebase.User | null) {
  const [profile, setProfile] = useState<Profile | null>(null)

  const fetchProfile = async (id: string) => {
    let profile = null

    if (id) {
      try {
        const documentSnapshot = await db.collection('profiles').doc(id).get()

        profile = documentSnapshot.exists
          ? (documentSnapshot.data() as Profile)
          : null
      } catch (error) {
        console.log('Error getting document:', error)
      }
    }

    return profile
  }

  useEffect(() => {
    if (user) {
      fetchProfile(user.uid).then((profile) => {
        setProfile(profile)
      })
    }
  }, [user])

  return { profile }
}
