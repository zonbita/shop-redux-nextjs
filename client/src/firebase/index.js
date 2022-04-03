import firebase from 'firebase/compat/app'
import "firebase/compat/storage"


const firebaseConfig = {

  };

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export { storage, firebase as default } 