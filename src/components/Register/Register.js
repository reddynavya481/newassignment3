import React, { Component } from 'react'
import { Input, Button } from 'antd'
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
import { Redirect, BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import {Helmet} from 'react-helmet';
import Dashboard from '../Dashboard/Dashboard'
import SDashboard from '../Dashboard/SDashboard'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Register extends Component {
    login = false
    state = {
        typ: 'user',
        login: false
    }
    toggleUser = () => {
        this.setState({ typ: 'admin' })
        this.props.handleUser(this.state.typ)
    }
    toggleAdmin = () => {
        this.setState({ typ: 'user' })
        this.props.handleUser(this.state.typ)
    }
    onRegister = () => {
        this.props.handleUser(this.state.typ)
        let url
        console.log(this.props.typ + " " + this.state.typ)
        if (this.state.typ === 'user') {
            url = 'http://localhost:8000/registeruser'
        }
        console.log(url)
        if (this.props.password === "" && this.props.username === "") {
            this.login = false
            NotificationManager.warning('Enter Credentials', '', 500);
            this.setState({login:false})
        }
        else if (this.props.password !== "" && this.props.username !== "") {
            axios.post(url, {
                username: this.props.username,
                password: this.props.password,
                typ: this.props.typ
            }).then(function (response) {
                console.log(response);
                NotificationManager.success('New account created!')
            })
                .catch(err => {
                    console.log(err)
                    this.setState({ username: '', password: '' })
                    NotificationManager.error('Username already exists!,Try to Login')
                })
        }
        else {
            alert('No username or password', 'Click me!', 3000);
        }
    }
    onLogin = () => {
        this.props.handleUser(this.state.typ)
        let self = this
        let lurl
        if (this.state.typ === 'user') {
            lurl = 'http://localhost:8000/loginuser'
        }
        else if (this.state.typ === 'admin') {
            lurl = 'http://localhost:8000/loginadmin'
        }
        axios.post(lurl, {
            username: this.props.username,
            password: this.props.password
        })
            .then(function (response) {
                console.log(response);
                localStorage.setItem("token", response.data.token)
                self.setState({ login: true })
                NotificationManager.success('login successful!')
            }).catch(err => {
                console.log(err)
                NotificationManager.error('Username or password Incorrect');
            })
    }

    render() {
        return (
            //here sdashboard is for students whereas dashboard is given for admins
            <div align="center" >
            <Helmet>
                <style>{'body { background-color: grey; }'}</style>
            </Helmet>
                {this.state.login && this.props.username!=''&& this.props.password!=''?
                    <div>
                        {this.state.typ === 'user' ?
                            <Redirect to='/sdashboard' />
                            : <Redirect to='/dashboard' />}
                        <Switch>
                            <Route path='/sdashboard'><SDashboard /></Route>
                            <Route path='/dashboard'><Dashboard /></Route>
                        </Switch></div>
                    :
                    //here both admin and user can login ,user can perform login,register but admin can only login
                    <div>
                        <h1>WAL Course Library</h1>
                        {this.state.typ === 'user' ? <h2>User Login</h2> : <h2>Admin Login</h2>}
                        <Input type="text" placeholder="enter username" size="large" prefix={<UserOutlined />} onChange={(e) => this.props.handleUserName(e.target.value)} style={{ width: '30%' }} value={this.props.username} /><br/>
                        <br/>
                        <Input.Password type="text" placeholder="enter password" size="large" onChange={(e) => this.props.handlePassword(e.target.value)} style={{ width: '30%' }} value={this.props.password} /><br/>
                        <br/>
                        {this.state.typ == 'user' ?
                            <div>
                                <Button type="primary" onClick={(e) => this.onLogin(this.state.typ)}>Login</Button>
                                <Button type="default" onClick={(e) => this.onRegister(this.state.typ)} style={{ marginLeft: '110px', marginBottom:'50px' }}>Don't have an account?Register</Button><br/>
                                <br/>
                                <br/>
                                <Button type="default" onClick={this.toggleUser}>Log in as Admin</Button></div> : <div>
                                <Button type="primary" onClick={(e) => this.onLogin(this.state.typ)}>Login</Button><br/>
                                <br/>
                                <Button type="default" onClick={this.toggleAdmin}>Log in as User</Button></div>
                        }
                        </div>
                }
                <NotificationContainer/>
            </div>
        )
    }
}
export default Register