import { useState } from 'react';
import Head from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SellerRegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3002/api/v1/auth/register/seller', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: name,
          email,
          password,
          company_name: companyName,
          company_description: companyDescription,
          company_address: companyAddress,
          company_phone: companyPhone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Регистрация успешна! Перенаправление на страницу входа...');
        setTimeout(() => {
          router.push('/sellers/login');
        }, 2000);
      } else {
        setMessage(data.detail || 'Ошибка регистрации.');
      }
    } catch (error) {
      console.error('Ошибка сети или сервера:', error);
      setMessage('Произошла ошибка при подключении к серверу. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Регистрация Продавца - Marketplace</title>
      </Head>

      <div className="register-card">
        <h1>Регистрация продавца</h1>
        <p className="subtitle">Создайте аккаунт для управления вашими товарами</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Введите ваше имя"
              minLength={2}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Введите ваш email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyName">Название компании</label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              placeholder="Введите название вашей компании"
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyDescription">Описание компании</label>
            <textarea
              id="companyDescription"
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              placeholder="Расскажите о вашей компании"
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyAddress">Адрес компании</label>
            <input
              type="text"
              id="companyAddress"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
              required
              placeholder="Введите адрес компании"
            />
          </div>
          <div className="form-group">
            <label htmlFor="companyPhone">Телефон компании</label>
            <input
              type="tel"
              id="companyPhone"
              value={companyPhone}
              onChange={(e) => setCompanyPhone(e.target.value)}
              required
              placeholder="Введите телефон компании"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Придумайте пароль"
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтверждение пароля</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Повторите пароль"
              minLength={6}
            />
          </div>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        {message && (
          <div className={`message ${message.includes('успешна') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <p className="login-link">
          Уже есть аккаунт? <Link href="/sellers/login">Войти</Link>
        </p>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: var(--background-secondary);
        }

        .register-card {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 500px;
        }

        h1 {
          text-align: center;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          font-size: 2rem;
        }

        .subtitle {
          text-align: center;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        input, textarea {
          width: 100%;
          padding: 0.8rem;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button:hover:not(:disabled) {
          background: var(--primary-color-dark);
          transform: translateY(-2px);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .message {
          margin-top: 1rem;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
        }

        .message.success {
          background: var(--success-light);
          color: var(--success);
        }

        .message.error {
          background: var(--error-light);
          color: var(--error);
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: var(--text-secondary);
        }

        .login-link a {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
        }

        .login-link a:hover {
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .container {
            padding: 1rem;
          }

          .register-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SellerRegisterPage; 