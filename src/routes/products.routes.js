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

// Get by product ID
router.get("/:pid",async (req, res) => {
    try {
        let pid = req.params.pid
        pid = Number(pid)

        if (!pid){return res.status(400).send({ status: "ParamsError", error: "the param pid is expected to be a number" })}

        // Get the product
        const product = await productManager.getProductById(pid)

        // If we get null then the product with given id wasn't found
        if (!product){
            res.status(404).send({status: "NotFoundError", error: "product with param id not found"})
        }

        res.send(product)
    
    } catch (error) {
        // Error handling if the productManager sends an error
        return res.status(500).send({status: "InternalServerError", error: "there was an error reading the data"})
    }
})

// export the router
export default router;