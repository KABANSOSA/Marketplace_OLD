import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Пароли не совпадают');
      return;
    }
    const err = await register({ name, email, password, role });
    if (err) setError(err);
    else setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Регистрация успешна!</h1>
        <Link href="/login" className="btn-primary">Войти</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Регистрация</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Имя"
          className="input-field"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="input-field"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          className="input-field"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
        />
        <select className="input-field" value={role} onChange={e => setRole(e.target.value as 'buyer' | 'seller')}>
          <option value="buyer">Покупатель</option>
          <option value="seller">Продавец</option>
        </select>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="btn-primary">Зарегистрироваться</button>
      </form>
      <div className="mt-4 text-sm">
        Уже есть аккаунт? <Link href="/login" className="text-blue-600">Войти</Link>
      </div>
    </div>
  );
} 