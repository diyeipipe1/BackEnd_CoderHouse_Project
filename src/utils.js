import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

// Hash passwords 
export const createHash =password=> bcrypt.hashSync(password,bcrypt.genSaltSync(10)); //irrervertible
export const isValidPassword =(user, password)=>bcrypt.compareSync(password,user.password);

// env extract
dotenv.config(); 
export const MongoConnection = process.env.MONGO_CONNECTION;
export const Port = process.env.PORT;
export const SessionSecret = process.env.SESSION_SECRET;
export const ClientSecret = process.env.CLIENT_SECRET;

// File paths
const __filename = fileURLToPath(import.meta.url); //Url a cadena de ruta
const __dirname = dirname(__filename);
export default __dirname;


// Role verification
export const HandlePolicies = (policies) => async(req, res, next) => {
    try {
        if (policies[0]==="PUBLIC") return next();
    
        let user = {}
        await fetch("http://localhost:8080/api/session/current", {headers: req.headers})
            .then(response => response.json())
            .then(data => user = data)

        if (user.error){
            return res.status(400).send({status: "AuthError", error: user.error}) 
        }

        if(!policies.includes(user.payload.role.toUpperCase())) return res.status(401).send({status: "UnauthorizedError", error: "endpoint not allowed for user role"})
        next();
    } catch (error) {
        return res.status(400).send({status: "AuthError", error: error.message})
    }
} 