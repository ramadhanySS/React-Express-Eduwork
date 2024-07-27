import { useParams } from 'react-router-dom';
import Input from '../../components/Input';
import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from '../../services/api';

const Edit = () => {
  const { id } = useParams();
  console.log('Product ID from URL:', id);
  const [product, setProduct] = useState({
    name: '',
    price: '',
    stock: '',
    status: true,
    image: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        if (response.status === 200) {
          setProduct(response.data);
        } else {
          console.error(`Error: Received status code ${response.status}`);
          window.alert('Terjadi kesalahan saat mengambil data produk!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        window.alert('Terjadi kesalahan saat mengambil data produk!');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
        fetchProduct();
      } else {
        console.error('Product ID is not provided');
        window.alert('ID produk tidak ditemukan!');
        setLoading(false);
      }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('stock', product.stock);
    formData.append('status', product.status);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
        const response = await updateProduct(id, formData);
        if (response.status === 200) {
          console.log('Product Updated:', response.data);
          window.alert('Product berhasil diperbarui!');
        } else {
          console.error(`Error: Received status code ${response.status}`);
          window.alert('Terjadi kesalahan saat memperbarui produk!');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        window.alert('Terjadi kesalahan saat memperbarui produk!');
      }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Product : {product.name}</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={product.name} onChange={handleChange} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={product.price} onChange={handleChange} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={product.stock} onChange={handleChange} />
          <Input name="image" type="file" label="Unggah Gambar" onChange={handleChange} />
          <Input name="status" type="checkbox" label="Active" checked={product.status} onChange={handleChange} />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
