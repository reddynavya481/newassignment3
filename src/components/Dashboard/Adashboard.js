import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input, Row, Col, Card, Popover } from 'antd'
import { UserOutlined, EditOutlined, LogoutOutlined, DeleteOutlined } from '@ant-design/icons';
import Atopics from '../Topics/Atopics1'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
const { TextArea } = Input
const { Meta } = Card
function Adashboard(props) {
  const [refresh, setRefresh] = useState(false)
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setconfirmLoading] = useState(false)
  const [coursename, setCoursename] = useState('')
  const [authorname, setAuthorname] = useState('')
  const [description, setDescription] = useState('')
  const [toggle, setToggle] = useState(false)
  const [display, setDisplay] = useState("")
  const [editable, setEditable] = useState(false)
  const [id, setId] = useState('')

  const clickHandler = (val) => {
    setToggle(true)
    setCoursename(val)
  }

  const togglehad = () => {
    setToggle(false)
  }

  const showModal = () => {
    setVisible(true)
  }

  const showEditModal = (val, val1, val2, val3) => {
    setEditable(true)
    setId(val)
    setCoursename(val1)
    setAuthorname(val2)
    setDescription(val3)
  }

  const handleedit = () => {
    setconfirmLoading(true)
    setTimeout(() => {
      setEditable(false)
      setconfirmLoading(false)
    }, 1000)
    axios.put("http://localhost:8000/course/" + id, {
      coursename: coursename,
      authorname: authorname,
      description: description
    })
      .then(function (response) {
        setRefresh(refresh => !refresh)
        NotificationManager.success('course Edited!')
      })
      .catch(err => {
        console.log(err)
        NotificationManager.error('Try again')
      })
    setCoursename('')
    setAuthorname('')
    setDescription('')
  }

  const handleOk = () => {
    setconfirmLoading(true)
    setTimeout(() => {
      setVisible(false)
      setconfirmLoading(false)
    }, 1000)
    axios.post("http://localhost:8000/course", {
      coursename: coursename,
      authorname: authorname,
      description: description
    }).then(function (response) {
      setRefresh(refresh => !refresh)
      NotificationManager.success('New course Added!')
    }).catch(err => {
      NotificationManager.error('Try again')
    })
    setCoursename('')
    setAuthorname('')
    setDescription('')
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleCancelEdit = () => {
    setEditable(false)
  }

  const courseName = (e) => {
    setCoursename(e.target.value)
  }

  const authorName = (e) => {
    setAuthorname(e.target.value)
  }

  const Description = (e) => {
    setDescription(e.target.value)
  }

  const deleteCard = (val) => {
    axios.delete("http://localhost:8000/delete/" + val)
    setRefresh(refresh => !refresh)
  }

  useEffect(() => {
    axios.get('http://localhost:8000/getcourse')
      .then(function (response) {
        console.log(response.data)
        setDisplay(response.data.course)
        localStorage.setItem("coursetoken", response.data.token)
      })
      .catch(err => {
        console.log(err)
      })
  }, [refresh])
  return (
    <div>
      <div>
        <UserOutlined style={{ fontSize: '26px', marginLeft: '1100px' }} />
        <h2 style={{ marginLeft: '1150px' }}>Hi {props.username}</h2>
        <Popover content={"logout ?"}>
          <LogoutOutlined onClick={props.logout}
            style={{ marginLeft: '1100px' }} />
        </Popover>
      </div>
      <Modal
        title="New Course"
        visible={visible}
        onOk={() => handleOk()}
        confirmLoading={confirmLoading}
        onCancel={() => handleCancel()}
      >
        <label>add course name</label>
        <Input type="text" onChange={(e) => courseName(e)} />
        <label>add author name</label>
        <Input type="text" onChange={(e) => authorName(e)} />
        <label>Add description</label>
        <TextArea rows={4} onChange={(e) => Description(e)} />
      </Modal>
      <Modal
        title="Edit Course"
        visible={editable}
        onOk={() => handleedit()}
        confirmLoading={confirmLoading}
        onCancel={() => handleCancelEdit()}
      >
        <label>change course name</label>
        <Input type="text" onChange={(e) => courseName(e)} value={coursename} />
        <label>change author name</label>
        <Input type="text" onChange={(e) => authorName(e)} value={authorname} />
        <label>change description</label>
        <TextArea rows={4} onChange={(e) => Description(e)} value={description} />
      </Modal>
      {!toggle ?
        <div>
          <Button onClick={() => showModal()}
            type="dashed">+Add a new Course</Button>
          <h2>Courses added by you</h2>
          {display ?
            <div className="site-card-wrapper">
              <Row gutter={16}>
                {display.map(item =>
                  <Col span={6}>
                    <Card style={{ marginRight: 10, width: 300, marginBottom: 5 }}
                      extra={<Button onClick={() => clickHandler(item.coursename)}>Check</Button>}
                      actions={[
                        <EditOutlined key="edit"
                          onClick={() =>
                            showEditModal(item.id, item.coursename, item.authorname, item.description)} />,
                        <Popover content={"delete?"}>
                          <DeleteOutlined onClick={() => deleteCard(item.coursename)} />
                        </Popover>]}>
                      <Meta
                        title={item.coursename}
                        description={`By ${item.authorname} \n ${item.description}`}
                      />
                    </Card>
                  </Col>)}
              </Row>
            </div> : null}
        </div> :
        <div>
          <Button onClick={() => togglehad()}
            style={{ marginRight: '1100px' }}>Back</Button>
          <Atopics coursename={coursename} />
        </div>}
      <NotificationContainer />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    username: state.course.username,
    password: state.course.password,
    typ: state.course.typ

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    get onLogout() {
      return () =>
        dispatch({
          type: 'SET_LOGOUT',
          payload: ''
        })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Adashboard);
