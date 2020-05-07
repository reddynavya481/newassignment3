import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Button, Card, Popover } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
import Stopics from '../Topics/Stopics1'
import { Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
const { Meta } = Card;
function Sdashboard1(props) {
  const [display, setDisplay] = useState("")
  const [coursename, setCoursename] = useState('')
  const [toggle, setToggle] = useState(false)
  const clickHandler = (val) => {
    setToggle(true)
    setCoursename(val)
  }
  const togglehad = () => {
    setToggle(false)
  }
  useEffect(() => {
    axios.get('http://localhost:8000/getcourse')
      .then(function (response) {
        console.log(response.data)
        setDisplay(response.data.course)
      }).catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      <div>
        <span><h1>Explore our Courses </h1></span>
        <span><UserOutlined style={{ fontSize: '26px', marginRight: '1100px' }} /></span>
        <span><h2 style={{ marginRight: '1100px' }}>Hi {props.username}</h2></span>
        <Popover content={"logout ?"}>
          <Button onClick={
            props.logout
          } style={{ marginLeft: '1100px', marginBottom: '10px' }} icon={<LogoutOutlined />}></Button>
        </Popover>
      </div>
      {!toggle ?
        <div>
          {display ?
            <div className="site-card-wrapper">
              <Row gutter={16}>
                {display.map(item =>
                  <Col span={6}>
                    <Card style={{ marginRight: 13, width: 300, marginBottom: 8 }} extra={<Button onClick={() => clickHandler(item.coursename)}>Register</Button>}>
                      <Meta
                        title={item.coursename}
                        description={`By ${item.authorname} \n ${item.description}`}
                      />
                    </Card>
                  </Col>)}
              </Row>
            </div> : null
          }
        </div> :
        <div>
          <Button onClick={() => togglehad()} style={{ marginRight: '1100px' }}>Back</Button>
          <Stopics coursename={coursename} />
        </div>}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    username: state.course.username,
    password: state.course.password,
    typ: state.course.typ,
    coursename: state.course.coursename

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    get onLogout() {
      return () =>
        dispatch({
          type: 'SET_LOGOUT'
        })
    },
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Sdashboard1);
// export default Sdashboard1
