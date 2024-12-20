import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/reducers/cartReducer';
import { AppDispatch, RootState } from '../../redux/store';
import Button from '../../components/Button';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { deleteIcon } from "../../assets"

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items } = useSelector((state: RootState) => state.cart);
    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const calculateTotal = () => {
        const total = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
        return total.toFixed(2);
    };

    const navigate = useNavigate()
    return (
        <div className="cart-page">
            <h1>Your Cart</h1>
            {items.length === 0 ? (
                <div className='cart-empty'>
                    <p>Your cart is empty.</p>
                    <Button color="primary" size="regular" onClick={() => navigate("/")}>Home</Button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {items.map(item => (
                            <div key={item.product.id} className="cart-item">
                                <img src={item.product.thumbnail} alt={item.product.title} />
                                <div className="item-details">
                                    <h3>{item.product.title}</h3>
                                    <p className="item-price">${item.product.price}</p>
                                    <div className="quantity-container">
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleUpdateQuantity(item.product.id, Number(e.target.value))}
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <Button color="danger" icon={deleteIcon} size="small" onClick={() => handleRemove(item.product.id)} />
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <h3>Total: ${calculateTotal()}</h3>
                        <Button color="danger" size="regular" onClick={handleClearCart}>Clear</Button>
                        <Button color="primary" size="regular" onClick={() => navigate("/")}>Home</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
