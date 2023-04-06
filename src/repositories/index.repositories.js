import UserRepository from "./users.repositories.js"
import UserDBManager from "../dao/dbmanagers/UserDBManager.js"

// activate the user manager
const userDBManager = new UserDBManager()

// Instance the repository with the DBManager and export it, repo has shell calls to Manager funcs
export const UserService = new UserRepository(userDBManager)