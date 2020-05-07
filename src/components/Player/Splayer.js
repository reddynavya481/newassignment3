import React from 'react'
//   import axios from 'axios'
  import './Player.css'
  import ReactPlayer from 'react-player'
//   import LoadingOutlined from '@ant-design/icons';
  
 function Splayer(props){
          let arr
          arr=<div className="player-wrapper"><ReactPlayer 
          className="react-player"
          url={props.urlp}
          autoplay={true}
          width="200%"
          height="200%"
          controls={true}
        /></div>
      return (
          arr
      )
    }
    export default Splayer