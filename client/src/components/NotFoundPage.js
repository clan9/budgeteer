import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <Link to="/">
        <h3>Sorry, page not found. Click here to go to the home page</h3>
      </Link>
    </div>
  );
};

export default NotFoundPage;
