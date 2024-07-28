import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import './index.scss';

function Detail() {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!_id) {
      setError('Invalid product ID');
      return;
    }
    console.log('Product ID:', _id);
    const fetchProduct = async () => {
      try {
        const response = await getProductById(_id);
        setProduct(response.data);
      } catch (error) {
        setError('Error fetching product data');
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [_id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">
        Kembali
      </Link>
      <Link to={`/edit/${product._id}`} className="btn btn-warning">
        Edit
      </Link>
      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp. {product.price.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.stock}</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>{product.image_url ? <img src={product.image_url} alt={product.name} width="100" /> : 'No image available'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Detail;
