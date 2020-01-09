import React from 'react';
import {Link} from 'react-router-dom';


class LoginBtnList extends React.Component {
    render() {
      return (
        <ul>
            <Link to="logout"><li className="list-group-item sidebar_title list-group-item-action">登出</li></Link>
            <Link to="Homepage"><li className="list-group-item sidebar_title list-group-item-action">文章列表</li></Link>
        </ul>
      );
    }
  }

class NoneLoginBtnList extends React.Component {
    render() {
        return (
        <ul>
            <Link to="register"><li className="list-group-item sidebar_title list-group-item-action" >註冊</li></Link>
            <Link to="login"><li className="list-group-item sidebar_title list-group-item-action">登入</li></Link>
            <Link to="Homepage"><li className="list-group-item sidebar_title list-group-item-action">文章列表</li></Link>
        </ul>
        );
    }
}

export default class SideBtnList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin : false
      }
    }
    render() {
      const isLogin = this.props.loggedInStatus;
      console.dir("isLogin");
      console.dir(isLogin);
      if (isLogin) {
        return (
          <LoginBtnList />
        );
      }
      else {
        return (
          <NoneLoginBtnList />
        );
      }
    }
  } 