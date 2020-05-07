import React, { useEffect, useState } from 'react'
import { Button, Modal, Input, Menu, Popover } from 'antd'
import 'antd/dist/antd.css';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Topics.css'
import Acontent from '../Content/Acontent1'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const { SubMenu } = Menu;
function Atopics1(props) {
  const [contenturl, setContenturl] = useState('')
  const [topicname, setTopicName] = useState('')
  const [newtopicname, setNewTopicName] = useState('')
  const [contentname, setContentname] = useState('')
  const [display, setDisplay] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [cont, setCont] = useState(false)
  const [show1, setShow1] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [refreshcont, setRefreshcont] = useState(false)
  const handleTopicName = (e) => {
    setTopicName(e.target.value)
  }
  const handleTopicNameU = (e) => {
    setNewTopicName(e.target.value)
  }
  const handleTopic = () => {
    setShow(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setShow(false)
      setConfirmLoading(false)
    }, 1000);
    axios.post("http://localhost:8000/topic1/" + props.coursename, {
      topicname: topicname
    })
      .then(function (response) {
        setRefresh(refresh => !refresh)
        NotificationManager.success('New topic Added!')
      })
      .catch(err => {
        NotificationManager.error('Try again')
      })
  }
  const handleOk1 = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setShow1(false)
      setConfirmLoading(false)
    }, 1000);
    axios.patch("http://localhost:8000/topic3/" + topicname, {
      topicname: newtopicname
    }).then(function (response) {
      setRefresh(refresh => !refresh)
      NotificationManager.success(' Topic Edited!')
    })
      .catch(err => {
        NotificationManager.error('Try again')
      })
  }
  const handleCancel = () => {
    setShow(false)
    setCont(false)
    setShow1(false)
  };

  const handleContentName = (e) => {
    setContentname(e.target.value)
  }
  const handleContenturl = (e) => {
    setContenturl(e.target.value)
  }
  const handleButtonClick = (val) => {
    setTopicName(val)
    setCont(true)
  }
  const deleteTopic = (val) => {
    axios.delete("http://localhost:8000/del/" + val)
    setRefresh(refresh => !refresh)
  }
  const editTopicName = (val) => {
    setTopicName(val)
    setShow1(true)
  }
  const handleCont = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setCont(false)
      setConfirmLoading(false)
    }, 1000);
    axios.post("http://localhost:8000/content1/" + topicname, {
      contentname: contentname,
      contenturl: contenturl
    }).then(function (response) {
      setRefreshcont(true)
      setRefresh(refresh => !refresh)
      NotificationManager.success('New content Added!')

    })
      .catch(err => {
        NotificationManager.error('Try again')
      })
  }
  useEffect(() => {
    axios.get('http://localhost:8000/topic/' + props.coursename)
      .then(function (response) {
        setDisplay(response.data.course)
      }).catch(err => {
        console.log(err)
      })
  }, [refresh, props.coursename])
  let arr
  if (display) {
    arr = display.map((item, index) => {
      return <div>
        <Menu
          style={{ width: 300, marginRight: 902, marginTop: 5 }}
          mode="inline">
          <SubMenu
            title={
              <span><Popover content={"add content"}>
                <PlusOutlined onClick={() => handleButtonClick(item.topicname)} style={{ marginRight: 15 }} />
              </Popover>
                <DeleteOutlined onClick={() => deleteTopic(item.topicname)} />
                <EditOutlined onClick={() => editTopicName(item.topicname)} style={{ marginLeft: 10 }} />{index + 1}.{item.topicname}</span>}>
            <Acontent contentname={item.topicname} />
          </SubMenu>
        </Menu>
      </div>
    })
  }
  return (
    <div>
      {refreshcont ? <Atopics1 coursename={props.coursename} /> :
        <div>
          <h2>CourseName : {props.coursename}</h2>
          <Button onClick={() => handleTopic()}>Add new topic</Button>
          <Modal
            title="New Topic"
            visible={show}
            onOk={() => handleOk()}
            confirmLoading={confirmLoading}
            onCancel={() => handleCancel()}
          >
            <label>add topic name</label>
            <Input type="text" onChange={(e) => handleTopicName(e)} />
          </Modal>
          <Modal
            title="Edit Topic"
            visible={show1}
            onOk={() => handleOk1()}
            confirmLoading={confirmLoading}
            onCancel={() => handleCancel()}
          >
            <label>edit topic name</label>
            <Input type="text" onChange={(e) => handleTopicNameU(e)} value={newtopicname} />
          </Modal>
          <Modal
            title="New Content"
            visible={cont}
            onOk={() => handleCont()}
            confirmLoading={confirmLoading}
            onCancel={() => handleCancel()}
          >
            <label>add content name</label>
            <Input type="text" onChange={(e) => handleContentName(e)} />
            <label>paste url</label>
            <Input type="text" onChange={(e) => handleContenturl(e)} />
          </Modal>
          {display ?
            <div>
              {/* {!toggle ? */}
              <div>{arr}</div>
              {/* : null} */}
            </div>
            : null
          }</div>}
      <NotificationContainer />
    </div>
  )
}

export default Atopics1
