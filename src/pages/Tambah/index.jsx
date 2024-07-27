import { useState } from 'react';
import Input from '../../components/Input';
import './index.scss';
import { createProduct } from '../../services/api';

const Tambah = () => {
  const [products, setProducts] = useState({
    name: '',
    price: '',
    stock: '',
    status: true,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setProducts((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!products.name || !products.price || !products.stock) {
      window.alert('Semua data harus diisi.');
      return;
    }

    const formData = new FormData();
    formData.append('name', products.name);
    formData.append('price', products.price);
    formData.append('stock', products.stock);
    formData.append('status', products.status);
    if (products.image) {
      formData.append('image', products.image); // Tambahkan file gambar
    }

    console.log('Submitting product data:', products);
    try {
      const response = await createProduct(formData);
      console.log('Product created:', response.data);
      window.alert('Produk berhasil disimpan!');
      setProducts({
        name: '',
        price: '',
        stock: '',
        status: true,
        image: null,
      });
      console.log('good', setProducts);
    } catch (error) {
      console.error('Error creating product:', error);
      window.alert('Terjadi kesalahan saat menyimpan produk.');
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={products.name} onChange={handleChange} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={products.price} onChange={handleChange} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={products.stock} onChange={handleChange} />
          <Input name="image" type="file" label="Upload Gambar" onChange={handleChange} />
          <Input name="status" type="checkbox" label="Active" checked={products.status} onChange={handleChange} />
          <button type="submit" className="btn btn-primary">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
