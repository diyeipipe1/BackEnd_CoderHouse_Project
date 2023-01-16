import express from "express";
import ProductManager from "../models/ProductManager.js";

// Bring the module
const router = express.Router();

// To read the JSON correctly
router.use(express.json())
router.use(express.urlencoded({extended: true}))

// activate the product manager
const productManager = new ProductManager("./src/products.json")

// Get all or Get limited number by query ?=limit 
router.get("/", async (req, res) => {
    // Try catch in case the number conversion of limit returns an error
    try {
        let limit = req.query.limit

        // get the products
        let products = await productManager.getProducts();

        // If a limit was sent by query, limit the products shown
        if (limit){
            limit = Number(limit)
            products = products.slice(0, limit)
            // Error handling if there was an error with the conversion and default value NaN triggered
            if (!limit){ return res.status(400).send({status: "QueryError", error: "the query is expected to have a number"}) } 
        }

        res.send(products)
    } catch (error) {
        // Error handling if the productManager sends an error
        return res.status(500).send({status: "InternalServerError", error: "there was an error reading the data"}) 
    }
})

router.post("/lol", async (req, res) => {
    let products = await productManager.addProduct("House","dd",2,"dd","eeee",2);
})

// export the router
export default router;