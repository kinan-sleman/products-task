import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ProductListingPage from './pages/productListing/index';
import AddProductPage from './pages/addProduct/index';
import "react-toastify/dist/ReactToastify.css"; 
import ProviderComponent from './redux/Provider';
import Header from './components/Header';
import CartPage from './pages/cart';

function App() {

  return (
    <Router>
      <ProviderComponent>
        <Header />
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
          <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/cart" element={<CartPage />} />

        </Routes>
      </ProviderComponent>
    </Router>
  );
}

export default App;
