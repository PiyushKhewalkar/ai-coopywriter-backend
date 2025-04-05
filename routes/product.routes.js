import { Router } from "express";

import { getProduct, getProducts, updateProduct, deleteProduct, createProduct } from "../controllers/product.controller.js";

const productRouter = Router()

productRouter.get('/', getProducts)

productRouter.get(':productId', getProduct)

productRouter.post('/create', createProduct)

productRouter.put('/:productId/update', updateProduct)

productRouter.delete('/:productId/delete', deleteProduct)

export default productRouter