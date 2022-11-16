import * as firebase from 'firebase';
import '@firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC5SvnIRgc4PMkp8-x7ITAAXwwwLu0bCpc",
    authDomain: "feasti-chef.firebaseapp.com",
    projectId: "feasti-chef",
    appId: "1:482930462579:android:b1cdb755fa264cccceff06"
};
firebase.initializeApp(firebaseConfig);
export default firebase;