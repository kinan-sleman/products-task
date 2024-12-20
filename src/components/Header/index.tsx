import { useState, useEffect } from 'react';
import './style.css';
import { plusCircle, shoppingCart } from "../../assets";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function Header() {
    const [showAdd, setShowAdd] = useState(true);
    const [showCart, setShowCart] = useState(true);
    const navigate = useNavigate();

    const { items } = useSelector((state: RootState) => state.cart);
    const cartItemCount = items.length;

    useEffect(() => {
        if (window.location.pathname === "/add-product") {
            setShowAdd(false);
            setShowCart(true);
        } else if (window.location.pathname === "/cart") {
            setShowCart(false);
            setShowAdd(true);
        } else {
            setShowCart(true);
            setShowAdd(true);
        }
    }, [navigate]);

    return (
        <div className="header">
            <Link to="/" className="site-name">
                <h1>My Store</h1>
            </Link>
            <div>
                {showAdd && (
                    <Link to="/add-product" className="header-button">
                        <img src={plusCircle} alt="Add Product" />
                    </Link>
                )}
                {showCart && (
                    <Link to="/cart" className="header-Link">
                        <div className="cart-icon-container">
                            <img src={shoppingCart} alt="Shopping Cart" />
                            {cartItemCount > 0 && (
                                <span className="cart-item-count">{cartItemCount}</span>
                            )}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
}
