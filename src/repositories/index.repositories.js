import UserRepository from "./users.repositories.js"
import UserDBManager from "../dao/dbmanagers/UserDBManager.js"

export const UserService = new UserRepository(new UserDBManager())