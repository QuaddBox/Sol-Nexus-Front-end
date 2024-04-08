import FirebaseService from "./FirebaseService";

const firebaseService = new FirebaseService("accounts")

class Accounts{
    async addAccount(data,pubKey){
        console.log(data);
        return firebaseService.createWithID(data,pubKey)
    }
    async findUser(pubKey){
        return firebaseService.findById(pubKey)
    }
}

export default new Accounts()