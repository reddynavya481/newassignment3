import React, { useEffect, useState } from 'react'
import { Menu, Checkbox } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
import './Content.css';
import { connect } from 'react-redux'
function Scontent1(props) {
  const [toggle, setToggle] = useState(false)
  const [content, setContent] = useState('')
  const togglehad = (val) => {
    props.onSetUrl(val)
    setToggle(false)
  }
  const onChange = (e) => {
    let val = e.target.checked
    axios.post("http://localhost:8000/content2/" + props.contentname, {
      completion: val
    })
  }

  let arr
  if (content) {
    arr = content.map((item, index) => {
      return <div>
        <Menu.Item style={{ marginBottom: 40 }}
          onClick={() => togglehad(item.contenturl)} >
          {index + 1}.{item.contentname}
          <Checkbox onChange={(e) => onChange(e)} />
        </Menu.Item>
      </div>
    }
    )
  }
  useEffect(() => {
    axios.get('http://localhost:8000/content/' + props.contentname)
      .then(function (response) {
        setContent(response.data.course)
      })
      .catch(err => {
        console.log(err)
      })
  }, [props.contentname])
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
