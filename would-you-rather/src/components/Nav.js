import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ users, authedUser }) => {
  const userName = users && users[authedUser] ? users[authedUser].name : null;
  const avatarURL = users && users[authedUser] ? users[authedUser].avatarURL : null;

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
              Questions
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" activeClassName="active">
              New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
              Leaderboard
          </NavLink>
        </li>
        <li>
          <div>
            <div className="login-nav">
              {userName}
            </div>
            <img
              src={avatarURL}
              alt={`Avatar of ${userName}`}
              className="avatar avatar-nav"
            />
          </div>
        </li>
        <li>
          <NavLink to="/logout" activeClassName="active">
              Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  users,
  authedUser,
});

Nav.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  // eslint-disable-next-line react/require-default-props
  authedUser: PropTypes.string,
};

export default connect(mapStateToProps)(Nav);
