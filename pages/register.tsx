// vbox-frontend/pages/register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registro exitoso. Redirigiendo al login...');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setError(data.message || 'Error al registrar');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Crear casillero</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="email" name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600">Crear Casillero</button>
      </form>
    </div>
  );
}
