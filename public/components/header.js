import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { FetchUser } from '../actions/fetchUser';
import axios from 'axios';

class Header extends Component {

  getUser() {
    axios
      .get('/auth/current_user')
      .then(res => {
        this.props.FetchUser(res.data);
      })
      .catch(err => console.log('in axios could not fetch User:', err));
  }

  componentDidMount() {
    this.getUser();
  }

  renderContent() {
    const user = this.props.auth;
    // console.log('in header this.props.auth:', user);
    switch (user) {
      case null:
        return;
      case false:
        const signIn = <li><Link to="/login" className="card-panel hoverable amber darken-4 btn" id='signIn'>Sign in</Link></li>
        return signIn;
      default:
        // <li>{this.props.auth}</li>
        const loggedIn = [
          <li><img id='thumbnail' className="circle responsive-img" src={user.thumbnail} /></li>,
          <li id="username" className="blue-grey-text text-lighten-4">{user.username}</li>,
          <li><a href="/auth/logout" className="card-panel hoverable amber darken-4 btn" id='signIn'>Log out</a></li>
        ];
        return loggedIn;
    }
  }

  goTo() {
    const user = this.props.auth;
    if (user) {
      if (user.userType === 0) {
        return '/student';
      }
      else if (user.userType === 1) {
        return '/instructor';
      }
    }
    else {
      return '/';
    }
  }

  render() {
    return (
      <div className='navbar-fixed'>

        <nav>
          <div className="nav-wrapper blue-grey darken-4">
            <Link id='title3' to={this.goTo()} className="left brand-logo blue-grey-text text-lighten-4"><img id='img' src="./img/logo.png" />AutoGrader</Link>
            {/* <ul id="middleContent" className="hide-on-med-and-down">
              <li className="blue-grey-text text-lighten-4">Middle Content</li>
            </ul> */}
            <ul id="nav-mobile" className="right show-on-medium-and-down">
              {this.renderContent()}
            </ul>
          </div>
        </nav>

      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    auth: state.auth.payload
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchUser
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Header);
