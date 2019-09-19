import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="content-container">
        <div className="header__content">
          <Link className="header__title" to="/dash">
            <h1>Budgeteer</h1>
          </Link>
          <a href="/auth/logout" className="button button--link">
            Logout
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
