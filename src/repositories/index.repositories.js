import UserRepository from "./users.repositories.js"
import UserDBManager from "../dao/dbmanagers/UserDBManager.js"
import CartRepository from "./carts.repositories.js"
import CartDBManager from "../dao/dbmanagers/CartDBManager.js"

// activate the user manager
const userDBManager = new UserDBManager()
const cartDBManager = new CartDBManager()

// Instance the repository with the DBManager and export it, repo has shell calls to Manager funcs
export const UserService = new UserRepository(userDBManager)
export const CartService = new CartRepository(cartDBManager)