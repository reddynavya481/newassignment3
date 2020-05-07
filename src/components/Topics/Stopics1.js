import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
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
  })
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
        </div>
        : null
      }
    </div>
  )
}

export default Stopics1
