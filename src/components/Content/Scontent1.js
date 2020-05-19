import React, { useEffect, useState } from 'react'
import { Menu, Checkbox } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
import './Content.css';
import { connect } from 'react-redux'
function Scontent1(props) {
  const [toggle, setToggle] = useState(false)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')
  const [cid, setCid] = useState(1)
  const togglehad = (val, val2) => {
    props.onSetUrl(val)
    setToggle(false)
    setCid(val2)
    // console.log("cid" + cid+" "+val2)
  }
  const onChange = (e) => {
    let val = e.target.checked
    axios.put('http://localhost:8000/updatestatus', {
      statusValue: val,
      username: props.username,
      contentId: cid
    }).then(function (response) {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })

  }
  useEffect(() => {
    axios.get('http://localhost:8000/content/' + props.contentname)
      .then(function (response) {
        console.log(response.data.course)
        setContent(response.data.course)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(props.username)
    axios.get('http://localhost:8000/status/' + props.username)
      .then(function (response) {
        console.log(response)
        setStatus(response.data.status1)
      }).catch(err => {
        console.log(err)
      })
  }, [props.contentname, props.username])
  let arr, noc
  if (content) {
    arr = content.map((item, index) => {
      return <div>
        <Menu.Item style={{ marginBottom: 40 }}
          onClick={() => togglehad(item.contenturl, item.id)} >
          {index + 1}.{item.contentname}
          {status ? (
            status.map((item1, index1) => {
              if (item1.contentId === item.id) {
                return <Checkbox onChange={(e) => onChange(e)} defaultChecked={item1.statusValue} />
              }
              else {
                noc = false
              }
            })

          ) : null}
          {!noc ? <Checkbox onChange={(e) => onChange(e)} /> :
            null
          }
        </Menu.Item>
      </div>
    }
    )
  }

  return (
    <div>
      {content ?
        <div>
          {!toggle ?
            <div>{arr}</div> : null}
        </div>
        : null}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    contenturl: state.course.urli,
    username: state.course.username
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
export default connect(mapStateToProps, mapDispatchToProps)(Scontent1)
