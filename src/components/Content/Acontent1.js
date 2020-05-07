import React, { useState, useEffect } from 'react'
import {  Menu } from 'antd'
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Content.css'
import Splayer from '../Player/Splayer'
// import ReactPlayer from 'react-player'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
function Acontent1(props) {
  const [contenturl, setContenturl] = useState('')
  const [player, setPlayer] = useState(false)
  const [content, setContent] = useState('')
  const [refresh, setRefresh] = useState(false)
  const deleteCont = (val) => {
    axios.delete("http://localhost:8000/delcont/" + val)
    setPlayer(false)
    setRefresh(refresh=>!refresh)
  }
  const togglehad = (val) => {
    setPlayer(true)
    setContenturl(val)
    // setRefresh(refresh=>!refresh)
  }
  let arr
  if (content) {
    arr = content.map((item, index) => {
      return <div><Menu.Item style={{ marginBottom: 30 }} onDoubleClick={() => togglehad(item.contenturl)} >{index + 1}.{item.contentname}<DeleteOutlined onClick={() => deleteCont(item.contentname)} /></Menu.Item></div>
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
  },[refresh,props.contentname])
  return (
    <div>
      <div>
        {content ?
          <div>
            <div>{arr}</div>
            {player ?
              <div>
                {/* <div className="player-wrapper"><ReactPlayer
                  className="react-player"
                  url={contenturl}
                  autoplay={true}
                  width="200%"
                  height="200%"
                  controls={true}
                /></div> */}
                <Splayer urlp={contenturl}/>
              </div> : null}
          </div> : null}
      </div>
      <NotificationContainer />
    </div>
  )
}

export default Acontent1
