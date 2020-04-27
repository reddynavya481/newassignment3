import React, { Component } from 'react'
  import axios from 'axios'
  import './Dashboard.css'
  import ReactPlayer from 'react-player'
  import LoadingOutlined from '@ant-design/icons';
  
  class Splayer extends Component{
      render(){
          let arr
          console.log(this.props.urli)
          arr=<div className="player-wrapper"><ReactPlayer 
          className="react-player"
          url={this.props.urli}
          autoplay={true}
          width="200%"
          height="200%"
          controls={true}
          onProgress={this.handleProgress}
        /></div>
      return (
          arr
      )
    }}
    export default Splayer