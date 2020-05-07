import React, { Component } from 'react'
import { Input, Button } from 'antd'
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Redirect, Link, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { Radio } from 'antd';
import { Form } from 'antd';
import { Helmet } from 'react-helmet';
import Dashboard from '../Dashboard/Adashboard'
import SDashboard from '../Dashboard/Sdashboard1'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Register extends Component {
    login = false
    state = {
        typ: 'user',
        login: false,
        cp: false,
        pass: ''
    }
    onChange = (e) => {
        if (e.target.value === "u")
            this.setState({ typ: 'user' })
        else
            this.setState({ typ: 'admin' })
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
        if (!this.state.cp)
            this.setState({ cp: true })
        else {
            if (this.props.password !== this.state.pass) {
                this.login = false
                this.setState({ login: false })
                NotificationManager.error('passwords did not matched')
            }
            else {

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
                    this.setState({ login: false })
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
        }
    }
    handleCnPassword = (e) => {
        this.setState({ pass: e.target.value })
    }
    onLogin = () => {
        this.setState({
            cp: false
        }
        )
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
                self.login = true
                NotificationManager.success('login successful!')
            }).catch(err => {
                console.log(err)

            })
        this.setState({ pass: '' })
    }
    handleLogout = () => {
        this.props.onLogout()
        this.login = false
        this.setState({ login: false })
    }

    render() {
        return (
            //here sdashboard is for students whereas dashboard is given for admins
            <div align="center" >
                <Helmet>
                    <style>{'body { background-color: #F5FCFF; }'}</style>
                </Helmet>
                {this.state.login && this.props.username !== '' && this.props.password !== '' ?
                    <div>
                        {this.state.typ === 'user' ?
                            <Redirect to='/sdashboard' />
                            : <Redirect to='/dashboard' />}
                        <Switch>
                            <Route path='/sdashboard'><SDashboard logout={this.handleLogout} /></Route>
                            <Route path='/dashboard'><Dashboard logout={this.handleLogout} /></Route>
                        </Switch></div>
                    :
                    //here both admin and user can login ,user can perform login,register but admin can only login
                    <div>
                        <h1>WAL Course Library</h1>
                        <h2>Choose Account Type</h2>
                        <Radio.Group onChange={this.onChange} defaultValue="u" size="large" style={{ marginRight: 10 ,height:50}}>
                            <Radio.Button value="a">
                                <UserOutlined />Admin
                        </Radio.Button>
                            <Radio.Button value="u">
                                <UserOutlined />User
                        </Radio.Button></Radio.Group><br /><br />
                        {this.state.typ === 'user' ? this.state.cp ? <p>Hello user!<br /> register yourself to continue  </p> : <p>Hello user!<br /> please fill out credentials</p> : <p>Hello admin!<br />please fill out credentials</p>}
                        <br />
                      
                        <br />
                        {this.state.typ === 'user' ?
                            <div>
                                {this.state.cp ?
                                    <div>
                                        <div>
                                            <label>Username: </label>
                                            <Input type="text" placeholder="enter username" size="large" prefix={<UserOutlined />} onChange={(e) => this.props.handleUserName(e.target.value)} style={{ width: '30%' }} value={this.props.username} /><br /><br />
                                            <label>Password: </label>
                                            <Input.Password type="text" placeholder="enter password" size="large" onChange={(e) => this.props.handlePassword(e.target.value)} style={{ width: '30%' }} value={this.props.password} />
                                            <br />
                                            <br />
                                            <Form.Item label="Confirm Password" hasFeedback style={{ width: '39%', marginRight: 69 }} validateStatus={this.props.password !== this.state.pass ? "error" : null} >
                                                <Input.Password type="text" placeholder="confirm password" size="large" onChange={(e) => this.handleCnPassword(e)} value={this.state.pass} />
                                            </Form.Item>
                                        </div>
                                        <Button type="primary" onClick={(e) => this.onRegister(this.state.typ)} htmlType="submit" style={{ width: 100 }}>Register</Button><br />
                                        <Link type="default" onClick={(e) => this.onLogin(this.state.typ)} >Have an account?Log in</Link><br /></div> :
                                    <div><div>
                                        <Input type="text" placeholder="enter username" size="large" prefix={<UserOutlined />} onChange={(e) => this.props.handleUserName(e.target.value)} style={{ width: '30%' }} value={this.props.username} /><br /><br />
                                        <Input.Password type="text" placeholder="enter password" size="large" prefix={<LockOutlined />} onChange={(e) => this.props.handlePassword(e.target.value)} style={{ width: '30%' }} value={this.props.password} /></div><br/>
                                        <Button type="primary" onClick={(e) => this.onLogin(this.state.typ)} htmlType="submit" style={{ width: 100 }}>Log in</Button><br />
                                        <Link type="default" onClick={(e) => this.onRegister(this.state.typ)} >Don't have an account?Register</Link><br /></div>
                                }
                                <br />
                                <br />
                            </div> : <div>
                            <Input type="text" placeholder="enter username" size="large" prefix={<UserOutlined />} onChange={(e) => this.props.handleUserName(e.target.value)} style={{ width: '30%' }} value={this.props.username} /><br /><br />
                                        <Input.Password type="text" placeholder="enter password" size="large" prefix={<LockOutlined />} onChange={(e) => this.props.handlePassword(e.target.value)} style={{ width: '30%' }} value={this.props.password} /><br/><br/>
                                <Button type="primary" onClick={(e) => this.onLogin(this.state.typ)}>Login</Button><br />
                                <br />
                            </div>
                        }
                    </div>
                }
                <NotificationContainer />
            </div>
        )
    }
}
export default Register