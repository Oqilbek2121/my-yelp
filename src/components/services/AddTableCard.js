import { store } from '../firebase/firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const TableCollectionRef = collection(store, "table");

class AddTableCard {
    addRestaurant = (newRestaurant) => {
        return addDoc(TableCollectionRef, newRestaurant);
    };

    updateTable = (id, updateTable) => {
        const tableDoc = doc(store, "table", id);
        return updateDoc(tableDoc, updateDoc);
    };
     
    deleteTable = (id) => {
        const tableDoc = doc(store, "table", id);
        return deleteDoc(tableDoc);
    };

    getAllTable = () => {
        return getDocs(TableCollectionRef);
    };

    getTable = (id) => {
        const tableDoc = doc(store, "table", id);
        return getDoc(tableDoc);
    };
}

export default new AddTableCard();