import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const InvalidRoute = ({ location }) => (
  <div className="invalid-route">
    <h3>
No match for
      {' '}
      <code>{location.pathname}</code>
    </h3>
    <Link to="/">
        Click here to navigate to the home page.
    </Link>
  </div>
);

InvalidRoute.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default InvalidRoute;
