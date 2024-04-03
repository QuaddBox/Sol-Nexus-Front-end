import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

class FirebaseService{
    collectionName;
    colRef;
    defaultResponse ={
        status:"pending",
        docId:null,
        error:null,
        data:null,
        errror_message: "this process is still pending"
    }
    constructor(collectionName){
        this.collectionName = collectionName
        this.colRef = collection(db,collectionName)
    }
    // gets all items in the a collection
    async get(){
        const response = {...this.defaultResponse}
        try {
        const querySnapshot = await getDocs(this.colRef);
        const data = []
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            data.push(doc.data())
        });
        response.data = data
        response.status = "success"
        } catch (error) {
            response.status = "failed"
            response.error = error
            response.errror_message = error.message?error.message:"could not get data please try again later"
        }
        return response
    }
    async findById(id){
        const response = {...this.defaultResponse}
        const docRef = doc(db,this.collectionName,id)
        try {
        const docData = await getDoc(docRef);
        if(docData.exists()){
            response.status = "success"
            response.data= docData.data()
        }
        response.error = "Not Found"
        response.errror_message = "sorry data could not be found"
        } catch (error) {
            response.status = "failed"
            response.error = error
            response.errror_message = error.message?error.message:"could not get data please try again later"
        }
        return response
    }
    async create(data){
        const response = {
            status:"pending",
            docId:null,
            error:null,
            errror_message: "this process is still pending"
        }
        try {
            const docRef = await addDoc(this.colRef,data)
            response.status = "success"
            response.docId = docRef.id
        } catch (error) {
            response.status = "failed"
            response.error = error
            response.errror_message = error.message?error.message:"could not add data please try again later"
        }
        return response
    }
    async createWithID(data,id){
        const newDocRef = doc(db,this.collectionName,id)
        const response = {
            status:"pending",
            docId:null,
            error:null,
            errror_message: "this process is still pending"
        }
        try {
            await setDoc(newDocRef,data)
            response.status = "success"
            response.docId = id
        } catch (error) {
            response.status = "failed"
            response.error = error
            response.errror_message = error.message?error.message:"could not add data please try again later"
        }
        return response
    }
    async update(id,data){
        const response = {...this.defaultResponse}
        try {
            const docRef = doc(db,this.collectionName,id)
            await updateDoc(docRef,data)
            response.status = "success"
            response.docId = id
        } catch (error) {
            response.status = "failed"
            response.error = error
            response.errror_message = error.message?error.message:"could not update data please try again later"
        }
        return response
    }
}

export default FirebaseService