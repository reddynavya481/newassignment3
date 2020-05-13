import React, { useState, useEffect } from 'react'
import { Menu,Button } from 'antd'
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Content.css'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { connect } from 'react-redux'
function Acontent1(props) {
  const [content, setContent] = useState('')
  const [refresh, setRefresh] = useState(false)

  const deleteCont = (val) => {
    axios.delete("http://localhost:8000/delcont/" + val)
    setRefresh(refresh => !refresh)
  }

  const togglehad = (val) => {
    props.onSetUrl(val)
  }

  let arr
  if (content) {
    arr = content.map((item, index) => {
      return <div><Menu.Item
        style={{ marginBottom: 30 }}>
        <Button onClick={() => togglehad(item.contenturl)}> Play</Button>
        {index + 1}.{item.contentname}
        <DeleteOutlined onClick={() => deleteCont(item.contentname)} />
      </Menu.Item></div>
    }
    )
  }
  useEffect(() => {
    axios.get('http://localhost:8000/content/' + props.contentname)
      .then(function (response) {
        setContent(response.data.course)
      }).catch(err => {
        console.log(err)
      })
  }, [refresh, props.contentname])

  return (
    <div>
      <div>
        {content ?
          <div>
            <div>{arr}</div>
          </div> : null}
      </div>
      <NotificationContainer />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    contenturl: state.course.urli,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    get onSetUrl() {
      return (value) =>
        dispatch({
          type: 'SETURL',
          payload: value
        })
    },
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Acontent1)

