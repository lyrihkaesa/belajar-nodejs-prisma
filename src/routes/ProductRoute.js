import express from "express";
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.put("/products", updateProduct);
router.delete("/products", deleteProduct);

export default router;
