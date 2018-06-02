
import * as firebase from 'firebase';

//you can move this config to env variable or some place else safe.
var config = {
    apiKey: "AIzaSyBEvaMwq6P6isryGNaI1lq6vzdHw4pMsgs",
    authDomain: "test-77116.firebaseapp.com",
    databaseURL: "https://test-77116.firebaseio.com",
    projectId: "test-77116",
    storageBucket: "test-77116.appspot.com",
    messagingSenderId: "60694812142"
  };
  export const firebaseRef = firebase.initializeApp(config);

