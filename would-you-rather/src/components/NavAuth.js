import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Nav from './Nav';
import QuestionsBoard from './QuestionsBoard';
import NewQuestion from './NewQuestion';
import Questions from './Questions';
import Logout from './Logout';

import LeaderBoard from './Leaderboard';
import NoMatch from './NoMatch';
import { handleInitialData } from '../actions/shared';

const getRedirectUrl = (pathname) => (pathname === '/logout' ? '/' : pathname);

class NavAuth extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(handleInitialData());
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { loading, location } = this.props;

    // eslint-disable-next-line react/prop-types
    const requestedUrl = getRedirectUrl(location.pathname);

    return (
      <>
        <Nav />
        {loading === true
          ? <Redirect to={`/login?redirectTo=${requestedUrl}`} />
          : (
            <div>
              <Switch>
                <Route path="/" exact component={QuestionsBoard} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/questions/:id" component={Questions} />
                <Route path="/logout" component={Logout} />
                <Route path="*" component={NoMatch} />
              </Switch>
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({ loading: authedUser === null });

NavAuth.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NavAuth);
