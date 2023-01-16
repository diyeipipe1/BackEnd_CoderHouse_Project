import express from "express";
import productRouter from "./routes/products.routes.js";

// Bring the module
const app = express();

// Bring the routers
app.use('/api/products', productRouter);

// Raise the server
app.listen(8080, () => {console.log("Server raised")});



