import express from "express";
import __dirname from '../utils.js'
import ProductManager from "../dao/filemanagers/ProductManager.js";
import ProductDBManager from "../dao/dbmanagers/ProductDBManager.js";

// Bring the module
const router = express.Router();

// To read the JSON correctly
router.use(express.json())
router.use(express.urlencoded({extended: true}))

// activate the product manager
const productManager = new ProductManager(__dirname+"/public/data/products.json")
const productDBManager = new ProductDBManager()

// Get all products
router.get("/", async(req, res) => {
    // Try catch in case the number conversion of limit returns an error
    try {
        // get the products
        let products = await productDBManager.getProducts(10,1,"","");

        let prods = products.payload

        res.render("home.handlebars", {prods})
    } catch (error) {
        // Error handling if the productManager sends an error
        return res.status(500).send({status: "InternalServerError", error: "there was an error reading the data"}) 
    }
})

router.get("/products", async (req, res) => {
    try {
        let limit = req.query.limit || 5
        let page = req.query.page || 1
        let sort = req.query.sort 
        let query = req.query.query 

        // get the products
        let response = await productDBManager.getProducts(limit, page, sort, query);

        let {payload, hasPrevPage, hasNextPage, prevLink, nextLink, pageNum} = response

        res.render("products", {
          payload,
          hasNextPage,
          hasPrevPage,
          nextLink,
          prevLink,
          pageNum
        });
    } catch (err) {
        // Error handling if the productManager sends an error
        return res.status(500).send({status: "InternalServerError", error: err.message}) 
    }
});


// Sockets - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Get all products in real time
router.get("/realtimeproducts", async(req, res) => {
    // Try catch in case the number conversion of limit returns an error
    try {
        // get the products
        let productRes = await productDBManager.getProducts(100,1,"","");

        let products = productRes.payload

        res.render("realTimeProducts.handlebars", {products})

    } catch (error) {
        // Error handling if the productManager sends an error
        return res.status(500).send({status: "InternalServerError", error: "there was an error reading the data"}) 
    }
})

// Chat application
router.get("/chat", async (req, res) => {
    res.render("chat.handlebars")
})



// export the router
export default router;