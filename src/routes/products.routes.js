import { Router } from "express";

// Bring the module
const router = Router();

// To read the JSON correctly
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// activate the product manager
const productManager = new ProductManager("./products.json")