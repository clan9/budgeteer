import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={props =>
        isAuthenticated ? <Redirect to="/dash" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth
});

export default connect(mapStateToProps)(PublicRoute);
