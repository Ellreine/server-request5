import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
	apiKey: 'AIzaSyB4hErulG3bIkgo9AwRrAkL-swQXN2kBEI',
	authDomain: 'request-server-firebase.firebaseapp.com',
	projectId: 'request-server-firebase',
	storageBucket: 'request-server-firebase.appspot.com',
	messagingSenderId: '512179579691',
	appId: '1:512179579691:web:91fd010fc0be097adcf36e',
	databaseURL: 'https://request-server-firebase-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
