import React from 'react';
import './header.css';

interface HeaderProps {
  onLogin: () => void;
  onLogout: () => void;
  userId: string;
}
const Header: React.FC<HeaderProps> = ({ onLogin, onLogout, userId }) => {
  return (
    <div className='mb-5 header position-relative'>
      <h1 className=''>오늘 뭐 입지?</h1>
      {userId ? (
        <button
          onClick={onLogout}
          className='btn btn-outline-secondary login-button position-absolute top-50 end-0'
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={onLogin}
          className='btn btn-outline-primary login-button position-absolute top-50 end-0'
        >
          <img
            src={process.env.PUBLIC_URL + '/google.png'}
            alt='google login'
            className='google-icon'
          />
          로그인
        </button>
      )}
    </div>
  );
};

export default Header;
