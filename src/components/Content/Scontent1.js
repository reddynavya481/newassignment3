import React, { useEffect, useState } from 'react'
import { Menu, Checkbox } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
import './Content.css';
import { connect } from 'react-redux'
import { nullableTypeAnnotation } from '@babel/types';
function Scontent1(props) {
  const [toggle, setToggle] = useState(false)
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')
  const [cid, setCid] = useState(1)
  const togglehad = (val) => {
    props.onSetUrl(val)
    setToggle(false)
  }
  const onChange = (val2,e) => {
    let val = e.target.checked
    console.log(val,val2)
    axios.put('http://localhost:8000/updatestatus', {
      statusValue: val,
      username: props.username,
      contentId: val2
    }).catch(err => {
      console.log(err)
    })

  }
  useEffect(() => {
    axios.get('http://localhost:8000/content/' + props.contentname)
      .then(function (response) {
        setContent(response.data.course)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(props.username)
    axios.get('http://localhost:8000/status/' + props.username)
      .then(function (response) {
        setStatus(response.data.status1)
      }).catch(err => {
        console.log(err)
      })
  }, [props.contentname, props.username])
  let arr, noc,nnn
  if (content) {
    arr = content.map((item, index) => {
      return <div>
        <Menu.Item style={{ marginBottom: 40 }}
          onClick={() => togglehad(item.contenturl)} >
          {index + 1}.{item.contentname}
          {status ? (
            status.filter((item1,index1)=>item1.contentId===item.id).map((item1, index1) => {
              if (item1.contentId === item.id) {
                noc='ya'
                nnn=item1.statusValue
                // return <Checkbox onChange={(e) => onChange(item.id,e)} defaultChecked={item1.statusValue} />
              }
              else {
                if(noc!='ya')
                noc = 'nav'
              }
            })

          ) : null}
          {noc=='nav'? <Checkbox onChange={(e) => onChange(item.id,e)} /> :
            null
          }
          {noc=='ya'? <Checkbox onChange={(e) => onChange(item.id,e)} defaultChecked={nnn} /> :
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
