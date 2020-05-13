import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import 'antd/dist/antd.css';
import {connect} from 'react-redux'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Scontent from '../Content/Scontent1'
const { SubMenu } = Menu;
function Stopics1(props) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/topic/' + props.coursename)
      .then(function (response) {
        console.log(response.data)
        setDisplay(response.data.course)
      }).catch(err => {
        console.log(err)
      })
  },[props.contenturl,props.coursename])
  let arr
  if (display) {
    arr = display.map((item, index) => {
      return <div>
        <Menu
          style={{ width: 256, marginRight: 902, marginTop: 5 }}
          mode="inline">
          <SubMenu
            key={`sub${index}`}
            title={
              <span>{item.topicname}</span>}>
            <Scontent contentname={item.topicname} />
          </SubMenu>
        </Menu>
      </div>
    })
  }
  return (
    <div>
      {display ?
        <div>
          <div >{arr}</div>
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={props.contenturl}
              width="50%"
              height="50%"
              controls={true}
            /></div>
        </div>
        : null
      }
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
export default connect(mapStateToProps, mapDispatchToProps)(Stopics1)


