import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const isAdmin = user?.email === "admin@gmail.com"; // 👈 Админди белгилөө

  // Firestore'дон маалымат алуу
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    };
    fetchProducts();
  }, []);

  // Товар кошуу
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    const docRef = await addDoc(collection(db, "products"), {
      name: newProduct.name,
      price: Number(newProduct.price),
    });
    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setNewProduct({ name: "", price: "" });
  };

  // Товар өчүрүү
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((p) => p.id !== id));
  };

  if (!user) return <h2>Алгач киришиңиз керек</h2>;
  if (!isAdmin) return <h2>❌ Сизде админ укугу жок</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>👨‍💻 Админ Панель</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Товар аты"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Баасы"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>➕ Кошуу</button>
      </div>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.price} сом
            <button onClick={() => handleDelete(p.id)}>❌ Өчүрүү</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
