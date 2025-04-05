import Product from "../models/product.model.js";

export const getProducts = async(req, res, next) => {
    try {

        const products = await Product.find()

        return res.status(200).json({success : true, products})
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}

export const getProduct = async(req, res, next) => {
    try {

        const {productId} = req.params

        const product = await Product.findById(productId)

        if (!product) return res.status(404).json({success: false, error : "Product not found"})

        return res.status(200).json({success : true, product})
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}

export const createProduct = async(req, res, next) => {
    try {

        const {
            name,
            category,
            description,
            targetMarket,
            pressingProblem,
            desiredOutcome,
            usp,
            specificMethod,
            specificStats,
            featuredIn,
            credibleFigure,
            uniqueMechanism,
            numberofReviews,
            avgRating,
            totalCustomers,
            testimonials
          } = req.body;

          const newProduct = new Product({
            name,
            category,
            description,
            targetMarket,
            pressingProblem,
            desiredOutcome,
            usp,
            specificMethod,
            specificStats,
            featuredIn,
            credibleFigure,
            uniqueMechanism,
            numberofReviews,
            avgRating,
            totalCustomers,
            testimonials,
          });

          await newProduct.save();

          return res.status(201).json({
            success: true,
            message: "Product successfully added",
            product: newProduct
          });
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}

export const deleteProduct = async(req, res, next) => {
    try {

        const {productId} = req.params

        const deletedProduct = await Product.findByIdAndDelete(productId)

        if (!deletedProduct) return res.status(404).json({success: false, error : "Product not found"})

        return res.status(200).json({success : true, message:"Product Deleted", deletedProduct})
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}

export const updateProduct = async(req, res, next) => {
    try {

        const {productId} = req.params

        const updatedFields = {...req.body}

        const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields)

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
          });
        
    } catch (error) {
        return res.status(500).json({success : false, error : "Internal Server Error", details : error.message})
    }
}