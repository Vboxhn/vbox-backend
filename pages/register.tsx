// src/pages/register.tsx (solo el manejador de submit)
import { useState } from 'react';
import { registerUserSmart } from '@/lib/api';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      await registerUserSmart({ name, lastName, phone, email, password });
      setMsg('Registrado con éxito ✅');
      // opcional: router.push('/login');
    } catch (err: any) {
      setMsg(err?.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      {/* …tus inputs… */}
      {/* asegúrate que los inputs setean estos estados: */}
      {/* setName, setLastName, setPhone, setEmail, setPassword */}
      <button type="submit" disabled={loading}>
        {loading ? 'Enviando…' : 'Registrarme'}
      </button>
      {msg && <div>{msg}</div>}
    </form>
  );
}
