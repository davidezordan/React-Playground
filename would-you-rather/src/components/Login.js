import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import * as qs from 'query-string';

import { handleLoginData, handleSetUser, handleLogoutUser } from '../actions/shared';

const LOGOUT_BUTTON = "Logout";
const LOGIN_BUTTON = "Login";

class Login extends PureComponent {
  componentDidMount() {
    const { dispatch, authedUser, history } = this.props;

    dispatch(handleLoginData());

    if (authedUser) {
      history.push('/');
    }
  }

  handleSubmit = (e, userId) => {
    e.preventDefault();

    const { dispatch, history, authedUser, location } = this.props;

    if (authedUser && userId === authedUser) {
      dispatch(handleLogoutUser());
    }
    else {
      dispatch(handleSetUser(userId));

      const params = qs.parse(location.search);
      history.push(params['redirectTo'] ?? '/');
    }
  }

  render() {
    const { users, authedUser } = this.props;
    const usersList = Object.keys(users).map((key) => users[key]);

    return (
      <div className="center">
        <h3>Login to</h3>
        <h2>Would you rather?</h2>
        <ul>
          {usersList.map((user) => (
            <li key={user.id}>
              <div className="login-item">
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className="avatar"
                />
                <div className="login-user-name">
                  {user.name}
                </div>
                {
                  <div className="login">
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      onClick={e=>this.handleSubmit(e, user.id)}
                    >
                        {authedUser === user.id ? LOGOUT_BUTTON : LOGIN_BUTTON}
                    </Button>
                  </div>
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => ({
  users,
  authedUser
});

Login.propTypes = {
  users: PropTypes.objectOf(PropTypes.object).isRequired,
  authedUser: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
