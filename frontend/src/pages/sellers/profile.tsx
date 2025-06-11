import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

interface SellerProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  company_name: string;
  company_description: string;
  company_address: string;
  company_phone: string;
  is_verified: boolean;
}

const SellerProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState<Partial<SellerProfile>>({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sellerId = localStorage.getItem('sellerId');

    if (!token || !sellerId) {
      router.push('/sellers/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/v1/sellers/${sellerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setFormData(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
        setMessage('Ошибка при загрузке профиля');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const sellerId = localStorage.getItem('sellerId');

    if (!token || !sellerId) {
      router.push('/sellers/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/api/v1/sellers/${sellerId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setMessage('Профиль успешно обновлен');
        setIsEditing(false);
      } else {
        const error = await response.json();
        setMessage(error.detail || 'Ошибка при обновлении профиля');
      }
    } catch (error) {
      console.error('Ошибка при обновлении профиля:', error);
      setMessage('Ошибка при обновлении профиля');
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка профиля...</p>
      </div>
    );
  }

  if (!profile) {
    return <div>Профиль не найден</div>;
  }

  return (
    <div className="profile-container">
      <Head>
        <title>Профиль продавца - Marketplace</title>
      </Head>

      <header className="profile-header">
        <h1>Профиль продавца</h1>
        <Link href="/sellers/dashboard" className="back-link">
          ← Назад к панели управления
        </Link>
      </header>

      {message && (
        <div className={`message ${message.includes('успешно') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="profile-card">
        {!isEditing ? (
          <>
            <div className="profile-section">
              <h2>Личная информация</h2>
              <div className="info-group">
                <label>Имя</label>
                <p>{profile.full_name}</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
              <div className="info-group">
                <label>Телефон</label>
                <p>{profile.phone}</p>
              </div>
            </div>

            <div className="profile-section">
              <h2>Информация о компании</h2>
              <div className="info-group">
                <label>Название компании</label>
                <p>{profile.company_name}</p>
              </div>
              <div className="info-group">
                <label>Описание компании</label>
                <p>{profile.company_description || 'Не указано'}</p>
              </div>
              <div className="info-group">
                <label>Адрес компании</label>
                <p>{profile.company_address}</p>
              </div>
              <div className="info-group">
                <label>Телефон компании</label>
                <p>{profile.company_phone}</p>
              </div>
              <div className="info-group">
                <label>Статус верификации</label>
                <p className={profile.is_verified ? 'verified' : 'not-verified'}>
                  {profile.is_verified ? 'Верифицирован' : 'Не верифицирован'}
                </p>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} className="edit-button">
              Редактировать профиль
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="profile-section">
              <h2>Личная информация</h2>
              <div className="form-group">
                <label htmlFor="full_name">Имя</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="profile-section">
              <h2>Информация о компании</h2>
              <div className="form-group">
                <label htmlFor="company_name">Название компании</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company_description">Описание компании</label>
                <textarea
                  id="company_description"
                  name="company_description"
                  value={formData.company_description || ''}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company_address">Адрес компании</label>
                <input
                  type="text"
                  id="company_address"
                  name="company_address"
                  value={formData.company_address || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company_phone">Телефон компании</label>
                <input
                  type="tel"
                  id="company_phone"
                  name="company_phone"
                  value={formData.company_phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Сохранить изменения
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData(profile);
                }}
                className="cancel-button"
              >
                Отмена
              </button>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .profile-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }

        .profile-header {
          margin-bottom: 2rem;
        }

        .back-link {
          color: var(--text-secondary);
          text-decoration: none;
          display: inline-block;
          margin-top: 0.5rem;
        }

        .back-link:hover {
          color: var(--primary-color);
        }

        .profile-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        .profile-section {
          margin-bottom: 2rem;
        }

        .profile-section h2 {
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
        }

        .info-group {
          margin-bottom: 1rem;
        }

        .info-group label {
          display: block;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        .info-group p {
          color: var(--text-primary);
          margin: 0;
          font-size: 1.1rem;
        }

        .verified {
          color: var(--success);
        }

        .not-verified {
          color: var(--error);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
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

        .form-actions {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
        }

        .edit-button, .save-button, .cancel-button {
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .edit-button {
          background: var(--primary-color);
          color: white;
          border: none;
          width: 100%;
        }

        .save-button {
          background: var(--primary-color);
          color: white;
          border: none;
          flex: 1;
        }

        .cancel-button {
          background: white;
          color: var(--text-primary);
          border: 2px solid var(--border-color);
          flex: 1;
        }

        .edit-button:hover, .save-button:hover {
          background: var(--primary-color-dark);
          transform: translateY(-2px);
        }

        .cancel-button:hover {
          border-color: var(--text-secondary);
          transform: translateY(-2px);
        }

        .message {
          margin-bottom: 1rem;
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

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--border-color);
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .profile-container {
            padding: 1rem;
          }

          .profile-card {
            padding: 1.5rem;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default SellerProfilePage; 