import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../redux/reducers/productsReducer";
import Button from "../../components/Button";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./style.css"

const AddProductPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const { loading } = useSelector((state: RootState) => state.product)

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    const handleAddProduct = async () => {
        const productData = { title, description, price, category };
        try {
            await dispatch(addNewProduct(productData));
            toast.success("Product added successfully!", {
                onClose: () => navigate("/"),
            });
        } catch (error) {
            console.error("Error adding product", error);
            toast.error("Error adding product. Please try again!"); 
        }
    };

    const handleCancel = () => {
        navigate("/")
    };

    return (
        <div className="add-product-container">
            <h1>Add New Product</h1>
            <div className="add-product-form">
                <div className="input-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter product title"
                    />
                </div>
                <div className="input-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter product description"
                    />
                </div>
                <div className="input-group">
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter product price"
                    />
                </div>
                <div className="input-group">
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter product category"
                    />
                </div>

                <div className="button-group">
                    <Button
                        color="primary"
                        size="regular"
                        onClick={handleAddProduct}
                        disabled={loading || !title || !description || !price || !category}
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </Button>
                    <Button
                        color="secondary"
                        size="regular"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
};

export default AddProductPage;
