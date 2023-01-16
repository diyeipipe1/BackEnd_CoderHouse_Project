import fs from "fs"

export default class CartManager{
    constructor(path){
        this.path = path;
        this.carts = [];
        this.init = false;
    }

    // Crea el archivo si no existe
    async initManager(){
        try {
            let carts = await fs.promises.readFile(this.path, 'utf-8')
            this.carts = JSON.parse(carts)
            this.init=true
        }catch (e){
            try {
                await fs.promises.writeFile(this.path, '[]');
                this.init = true;
            } catch (error) {
                throw error;
            }
        }
    }

    // Create
    async addCart(products){
        try {
            if (!this.init) {
                await this.initManager()
            }

            // Error checking, see if data has the correct typing
            if (Array.isArray(products)){

                // Find maxID in file to set new ID as one higher
                let maxID = 0
                if (this.carts.length>0) {
                    this.carts.forEach((cart) => {
                        if (cart.id > maxID) {
                            maxID = cart.id
                        }
                    })
                }

                // Creates cart 
                let cart = {
                    'id': maxID + 1,
                    'products': []
                }

                // If products in request have extra fields, don't use them. Assumes product field types are ok (todo might be revised later)
                products.forEach((prod) =>{
                    // Error checking, see if there's missing data
                    if (prod.title && prod.description && prod.price && prod.thumbnail && 
                        prod.code && prod.stock && prod.category){
                            // If no status was sent, set as true
                            prod.status = typeof prod.status !== 'undefined' ? prod.status : true;

                            let product = {
                                'id': prod.id,
                                'title': prod.title,
                                'description': prod.description,
                                'price': prod.price,
                                'thumbnail': prod.thumbnail,
                                'code': prod.code,
                                'stock': prod.stock,
                                'category': prod.category,
                                'status': prod.status
                            }
        
                            cart.products.push(product)
                        }else{
                            console.log("Missing data")
                            throw new Error("one or more products have missing required fields")
                        }
                })

                // Save data in file and in array
                this.carts.push(cart)
                await fs.promises.writeFile(this.path, JSON.stringify(this.carts))

                // Return product added
                return cart
            }else{
                console.log("Wrong type of data")
                throw new Error("type mismatch with one or more fields in request body")
            }
        } catch (error) {
            throw error;
        }
    }

    // Read
    async getCartById(id){
        try {
            if (!this.init) {
                await this.initManager()
            }

            let cart = this.carts.find(cart => cart.id === id)
            if (cart) {
                return cart.products
            }

            console.log("no carts with given ID")
            return null
        } catch (error) {
            throw error
        }
    } 

    // Add stock for product
    
}