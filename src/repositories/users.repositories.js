import UserDTO from "../dao/dto/UserDTO.js"

export default class UserRepository{
    constructor(dao){
        this.dao = dao;
    }

    getUserCurrent(userSession) {
        return {
            first_name: userSession.first_name,
            last_name: userSession.last_name,
            email: userSession.email,
            age: userSession.age,
            role: userSession.role,
            cart: userSession.cart,
        } 
    }


}