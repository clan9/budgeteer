import React from 'react';

export const LoginPage = ({ startLogin }) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Budgeteer</h1>
      <p>It's time to get your expenses under control!</p>
      <a className="button" href="/auth/google">
        Login with Google
      </a>
    </div>
  </div>
);

export default LoginPage;
