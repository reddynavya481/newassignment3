import React, { useEffect, useState } from 'react'
import { Menu,Checkbox } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
import './Content.css';
import Splayer from '../Player/Splayer'
function Scontent1(props) {
  const [toggle, setToggle] = useState(false)
  const [contenturl, setContenturl] = useState('')
  const [player, setPlayer] = useState(false)
  const [content, setContent] = useState('')
  const togglehad = (val) => {
    setPlayer(true)
    setContenturl(val)
    setToggle(false)
  }
  const onChange = (e) => {
    console.log(e.target.checked)

  }
  let arr
  if (content) {
    arr = content.map((item, index) => {
      return <div>
      <Menu.Item style={{ marginBottom: 40 }} 
      onClick={() => togglehad(item.contenturl)} >
      {index + 1}.{item.contentname}
      <Checkbox onChange={() => onChange()} />
      </Menu.Item>
      </div>
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
  })
  return (
    <div>
      {content ?
        <div>
          {!toggle ?
            <div>{arr}</div> : null}
          {player ?
            <Splayer urlp={contenturl}/>
            : null}
        </div>
        : null}
    </div>
  )
}

export default Scontent1
