import React, { useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (formData.id && formData.name && formData.price && formData.quantity) {
      setProducts([...products, { ...formData, id: parseInt(formData.id) }]);
      setFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        quantity: ''
      });
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleRefresh = () => {
    setProducts([]);
    setSearchTerm('');
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      quantity: ''
    });
  };

  const filteredProducts = products.filter(product =>
    product.id.toString().includes(searchTerm) ||
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🟧 Telusko Trac</h1>
          <button className="refresh-btn" onClick={handleRefresh}>Refresh</button>
        </div>
      </header>

      <div className="container">
        <div className="left-section">
          <div className="total-counter">
            <p>Total: {products.length}</p>
          </div>

          <form className="add-product-form" onSubmit={handleAddProduct}>
            <h2>Add Product</h2>
            <input
              type="text"
              name="id"
              placeholder="ID"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="add-btn">Add</button>
          </form>

          <div className="products-table">
            <h2>Products</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>DESCRIPTION</th>
                  <th>PRICE</th>
                  <th>QUANTITY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-products">No products found.</td>
                  </tr>
                ) : (
                  filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${parseFloat(product.price).toFixed(2)}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by id, name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="brand-card">
            <h3>📦 Track. Manage. Grow.</h3>
            <p>Streamline your inventory with smart product management that scales with your business.</p>
            <p className="powered-by">POWERED BY <span>TELUSKO</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;