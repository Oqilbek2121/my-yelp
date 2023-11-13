import { initializeApp } from "firebase/app"; 
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCGuv7PIoBH1jDVA3QkZB4LGqR4LCU_fYs",
    authDomain: "my-yelp-1.firebaseapp.com",
    projectId: "my-yelp-1",
    storageBucket: "my-yelp-1.appspot.com",
    messagingSenderId: "140367169138",
    appId: "1:140367169138:web:0fc954b24967fab1c364eb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const store = getFirestore(app);