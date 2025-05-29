// src/pages/CategoryList.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

type Category = {
  id: number;
  name: string;
};

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/categories', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      setCategories(res.data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to delete this category?')) {
      await axios.delete(`http://localhost:3000/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <button className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-gray-300">Loading...</p>
      ) : (
        <table className="w-full table-auto text-white border border-gray-600">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className="border-t border-gray-700 hover:bg-gray-800">
                <td className="p-3">{cat.name}</td>
                <td className="p-3 space-x-2">
                  <button className="text-yellow-400 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(cat.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
