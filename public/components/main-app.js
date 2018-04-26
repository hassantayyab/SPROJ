import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import decode from 'jwt-decode';
// actions
import { FetchUser } from '../actions/fetchUser';
import Header from './header';
import App from '../containers/container-answerbox2';
import Assignments from './assignments';
import Courses from './courses';
import Login from './login';
import Home from './home';


class MainApp extends Component {
  // componentDidMount() {
  //   this.props.FetchUser();
  // }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            {/* <Switch> */}
            <Route exact path="/"                    component={Home} />
            <Route exact path="/login"               component={Login} />
            <Route exact path="/student"             component={Courses} />
            <Route exact path="/instructor"          component={Courses} />            
            <Route exact path="/assignments:filter?" component={Assignments} />
            <Route exact path="/app:filter?"         component={App} />
            {/* </Switch> */}
            {/* <Home/> */}
          </div>
        </Router>
      </div>
    );
  };
};

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchUser
  }, dispatch);
}

export default connect(null, matchDispatchToProps)(MainApp);
