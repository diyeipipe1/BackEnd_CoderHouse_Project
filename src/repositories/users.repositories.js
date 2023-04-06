import UserDTO from "../dao/dto/UserDTO.js"

// A shell class that calls the methods from the dao (we know which methods the dao has) after
// going by a DTO arquitecture to check correct data. This case is a little unnecesary as 
// bussiness has data checking logic, but that could be simplified by moving some verifs to this class
export default class UserRepository{
    constructor(dao){
        this.dao = dao;
    }

    getUserCurrent(userSession) {
        // To have a correct flow of data, instance the DTO
        const userDTO = new UserDTO(userSession)

        return {
            first_name: userDTO.first_name,
            last_name: userDTO.last_name,
            email: userDTO.email,
            age: userDTO.age,
            role: userDTO.role,
            cart: userDTO.cart,
        } 
    }

}