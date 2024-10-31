// src/components/ProductList.js

import React, { useState, useEffect } from 'react';
import ProductDetails from './ProductDetails';
import products from '../products.json';

function ProductList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productList, setProductList] = useState(products); // New state for products

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleAddCommentToProduct = (productId, newComment) => {
        setProductList((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId
                    ? { ...product, comments: [...product.comments, newComment] }
                    : product
            )
        );
    };

    const filteredProducts = productList
        .filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (categoryFilter ? product.category === categoryFilter : true)
        )
        .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

    return (
        <div style={{ padding: '20px' }}>
            <h1>Smartphone Accessories Shop</h1>

            {/* Search, Sort, and Filter */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
                    <option value="">All Categories</option>
                    <option value="Charger">Charger</option>
                    <option value="Screen">Screen</option>
                    <option value="Case">Case</option>
                    <option value="Audio">Audio</option>
                    <option value="Mount">Mount</option>
                </select>
                <button onClick={toggleSortOrder} style={sortButtonStyle}>
                    {sortOrder === 'asc' ? (
                        <i className="bi bi-arrow-up">Lowest to Highest</i>
                    ) : (
                        <i className="bi bi-arrow-down">Highest to Lowest</i>
                    )}
                </button>
            </div>

            {/* Product List - Responsive Grid */}
            <div style={gridContainerStyle}>
                {filteredProducts.map((product) => (
                    <div key={product.id} style={productCardStyle}>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '25vh', objectFit: 'contain' }}
                        />
                        <h3>{product.name}</h3>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button
                            onClick={() => setSelectedProduct(product)}
                            style={{ backgroundColor: '#1CAAD9', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            View Details
                        </button>

                        <button
                            onClick={() => handleAddToCart(product)}
                            style={{ backgroundColor: '#FF6B6B', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Product Details Modal */}
            {selectedProduct && (
                <ProductDetails
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddComment={handleAddCommentToProduct}
                    comments={productList.find((p) => p.id === selectedProduct.id).comments} // Pass latest comments
                />
            )}

            {/* Cart Summary */}
            <div style={{ marginTop: '20px' }}>
                <h2>Shopping Cart</h2>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul style={shoppingCart}>
                        {cart.map((item, index) => (
                            <li style={shoppingCartItem} key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

// CSS-in-JS Styles
const gridContainerStyle = {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(30vh, 2fr))',
};

const productCardStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '5px',
};

const shoppingCart = {
    padding: '10px',
    borderRadius: '5px',
};

const shoppingCartItem = {
    border: '1px solid #ccc',
    padding: '15px',
    margin: '5px',
    gap: '5px',
    borderRadius: '5px',
};

// Styling for the sort button
const sortButtonStyle = {
    border: 'solid 1px',
    cursor: 'pointer',
    fontSize: '20px',
    marginBottom: '10px',
    marginTop: '0',
};

export default ProductList;