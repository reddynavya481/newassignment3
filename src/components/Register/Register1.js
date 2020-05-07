import React, { useState } from 'react'

function Register1() {
  let login = false
  const [typ, setTyp] = useState('user')
  const [login, setLogin] = useState(false)
  const [cp, setCp] = useState(false)
  const [pass, setPass] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onChange = (e) => {
    if (e.target.value === "u")
      setTyp('user')
    else
      setTyp('admin')
  }

  const toggleUser = () => {
    setTyp('admin')
    props.handleUser(typ)
  }

  toggleAdmin = () => {
    setTyp('user')
    props.handleUser(typ)
  }

  onRegister = () => {
    if (!cp)
      setCp(true)
    else {
      if (props.password !== pass) {
        login = false
        setLogin(false)
        NotificationManager.error('passwords did not matched')
      }
      else {
        props.handleUser(typ)
        let url
        if (typ === 'user') {
          url = 'http://localhost:8000/registeruser'
        }
        if (props.password === "" && props.username === "") {
          login = false
          NotificationManager.warning('Enter Credentials', '', 500);
          setLogin(false)
        }
        else if (props.password !== "" && props.username !== "") {
          axios.post(url, {
            username: props.username,
            password: props.password,
            typ: props.typ
          }).then(function (response) {
            console.log(response);
            NotificationManager.success('New account created!')
          })
            .catch(err => {
              console.log(err)
              setUsername('')
              setPassword('')
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
    setPass(e.target.value)
  }
  onLogin = () => {
    setCp(false)
    props.handleUser(typ)
    let lurl
    if (typ === 'user') {
      lurl = 'http://localhost:8000/loginuser'
    }
    else if (typ === 'admin') {
      lurl = 'http://localhost:8000/loginadmin'
    }
    axios.post(lurl, {
      username: props.username,
      password: props.password
    })
      .then(function (response) {
        setLogin(true)
        login = true
        NotificationManager.success('login successful!')
      }).catch(err => {
        console.log(err)
      })
    setPass('')
  }
  handleLogout = () => {
    props.onLogout()
    login = false
    setLogin(false)
  }
  return (
    <div align="center" >
      <Helmet>
        <style>{'body { background-color: #F5FCFF; }'}</style>
      </Helmet>
      {login && props.username !== '' && props.password !== '' ?
        <div>
          {typ === 'user' ?
            <Redirect to='/sdashboard' />
            : <Redirect to='/dashboard' />}
          <Switch>
            <Route path='/sdashboard'><SDashboard logout={() => handleLogout()} /></Route>
            <Route path='/dashboard'><Dashboard logout={() => handleLogout()} /></Route>
          </Switch></div>
        :
        <div>
          <h1>WAL Course Library</h1>
          <h2>Choose Account Type</h2>
          <Radio.Group onChange={() => onChange()} defaultValue="u" size="large" style={{ marginRight: 10, height: 50 }}>
            <Radio.Button value="a">
              <UserOutlined />Admin
            </Radio.Button>
            <Radio.Button value="u">
              <UserOutlined />User
            </Radio.Button></Radio.Group><br /><br />
          {typ === 'user' ? cp ? <p>Hello user!<br /> register yourself to continue  </p> : <p>Hello user!<br /> please fill out credentials</p> : <p>Hello admin!<br />please fill out credentials</p>}
          <br />

          <br />
          {typ === 'user' ?
            <div>
              {cp ?
                <div>
                  <div>
                    <label>Username: </label>
                    <Input type="text"
                      placeholder="enter username"
                      size="large"
                      prefix={<UserOutlined />}
                      onChange={(e) => props.handleUserName(e.target.value)}
                      style={{ width: '30%' }}
                      value={props.username} /><br /><br />

                    <label>Password: </label>
                    <Input.Password type="text"
                      placeholder="enter password"
                      size="large"
                      onChange={(e) => props.handlePassword(e.target.value)}
                      style={{ width: '30%' }}
                      value={props.password} /><br /><br />

                    <Form.Item label="Confirm Password"
                      hasFeedback style={{ width: '39%', marginRight: 69 }}
                      validateStatus={this.props.password !== this.state.pass ? "error" : null} >
                      <Input.Password type="text"
                        placeholder="confirm password"
                        size="large"
                        onChange={(e) => handleCnPassword(e)}
                        value={this.state.pass} />
                    </Form.Item>

                  </div>
                  <Button type="primary"
                    onClick={(e) => onRegister(typ)}
                    htmlType="submit"
                    style={{ width: 100 }}>Register</Button><br />

                  <Link type="default"
                    onClick={(e) => onLogin(typ)} >Have an account?Log in</Link><br /></div> :
                <div>
                  <div>
                    <Input type="text"
                      placeholder="enter username"
                      size="large"
                      prefix={<UserOutlined />}
                      onChange={(e) => props.handleUserName(e.target.value)}
                      style={{ width: '30%' }}
                      value={username} /><br /><br />

                    <Input.Password type="text"
                      placeholder="enter password"
                      size="large"
                      prefix={<LockOutlined />}
                      onChange={(e) => props.handlePassword(e.target.value)}
                      style={{ width: '30%' }}
                      value={props.password} />
                  </div><br />

                  <Button type="primary"
                    onClick={(e) => onLogin(this.state.typ)}
                    htmlType="submit"
                    style={{ width: 100 }}>Log in</Button><br />

                  <Link type="default"
                    onClick={(e) => onRegister(typ)} >Don't have an account?Register</Link><br /></div>
              }
              <br />
              <br />
            </div> : <div>
              <Input type="text"
                placeholder="enter username"
                size="large"
                prefix={<UserOutlined />}
                onChange={(e) => props.handleUserName(e.target.value)}
                style={{ width: '30%' }}
                value={props.username} /><br /><br />

              <Input.Password type="text"
                placeholder="enter password"
                size="large"
                prefix={<LockOutlined />}
                onChange={(e) => props.handlePassword(e.target.value)}
                style={{ width: '30%' }}
                value={props.password} /><br /><br />

              <Button type="primary"
                onClick={(e) => onLogin(typ)}>Login</Button><br /><br />
            </div>
          }
        </div>
      }
      <NotificationContainer />
    </div>
  )
}

export default Register1
