import React from 'react';
import axios from 'axios';
import webhookURL from '../util/config/webhookURL';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        }
        this.googleLogin = this.googleLogin.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    googleLogin(event) {
        console.log('hi', this)
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
client_id=${webhookURL.CLIENT_ID}&
redirect_uri=${webhookURL.WEB_URL}/oauth/google/callback&
response_type=code&
scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
`
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log("內容有變動");
    }

    handleSubmit(event) {
        const {username, password} = this.state;
        axios.post( webhookURL.url + '/api/login/submit', {
            user: {
                username: username,
                password: password
            }
        },
        {
            withCredentials: true
        },
        )
        .then(response => {
            if (response.data.isLoggedIn){
                console.dir("登入成功!");
                //localStorage.setItem('usertoken', response.data.token);
                this.setState({loginErrors: response.data.errorText});
                console.log("登入結果!", response);
                this.props.handleSuccessfulAuth(response.data);
            }
            else if (!response.data.isLoggedIn){
                this.setState({loginErrors:response.data.errorText});
            }
        })
        .catch(error => {
            console.dir("登入失敗!", error);
        })
        event.preventDefault();
    }
    
    render() {
        return (
            <div className="article">
                <div className="article_title">
                    <div className="row justify-content-between validate">
                        <div className="col-5">
                            <button className="btn btn-light"
                                onClick={this.googleLogin}
                            > Google OAuth </button>
                        </div>
                        <div className="col-7">
                            <p className="error_code">{this.state.loginErrors}</p>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit} >
                        <div className="row validate">
                            <p>帳號: </p>
                            <input type="text" 
                                name="username" 
                                placeholder="Username" 
                                value={this.state.username} 
                                onChange={this.handleChange}  
                                className="form-control" 
                                autoComplete="username" 
                                maxLength="16" 
                                required
                                />
                        </div>
                        <div className="row validate">
                            <p>密碼:</p>
                            <input type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                className="form-control" 
                                autoComplete="new-password" 
                                maxLength="16" 
                                required 
                            />
                        </div>
                        <div className="row justify-content-between validate">
                            <div className="col-5">
                                <button type="submit" className="btn btn-light">登入</button>
                            </div>
                            <div className="col-7">
                                <p className="error_code">{this.state.loginErrors}</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
