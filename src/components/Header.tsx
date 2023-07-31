import React from 'react';

type Props = {
  onLogin: () => void;
  onLogout: () => void;
  userId: string;
};

const BUTTON_STYLE =
  'w-20 h-8 flex items-center justify-center border border-blue-500 rounded-md text-sm';

const Header = ({ onLogin, onLogout, userId }: Props) => {
  return (
    <header className='w-full h-16 flex items-center justify-between px-5'>
      <h1 className='text-2xl font-bold'>오늘 뭐 입지?</h1>
      {userId ? (
        <button
          onClick={onLogout}
          className={`${BUTTON_STYLE} border-neutral-300`}
        >
          로그아웃
        </button>
      ) : (
        <button onClick={onLogin} className={BUTTON_STYLE}>
          <img
            src={process.env.PUBLIC_URL + '/google.png'}
            alt='google login'
            className='w-5 h-5 mr-1'
          />
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
