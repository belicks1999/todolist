// front-end/src/components/LoginSuccess.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const user = params.get('user');
    if (user) {
      const userData = JSON.parse(decodeURIComponent(user));
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div>
      Loading...
    </div>
  );
};

export default LoginSuccess;
