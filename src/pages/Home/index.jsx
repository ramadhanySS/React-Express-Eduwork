import { Link } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        console.log('data', response);
      } catch (error) {
        console.error('Error Fetching Product: ', error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((product) => product._id !== id));
        console.log('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product: ', error);
      }
    }
  };

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">
        Tamah Produk
      </Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td className="text-right">{`RP. ${product.price.toLocaleString()}`}</td>
              <td className="text-center">
                <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">
                  Detail
                </Link>
                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">
                  Edit
                </Link>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
