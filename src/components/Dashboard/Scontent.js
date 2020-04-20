import React, { Component } from 'react'
// import { connect } from 'react-redux';
import { Button, Modal, Input,Card,Menu,Checkbox } from 'antd'
import 'antd/dist/antd.css';
import { Redirect,BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import axios from 'axios'
import './Dashboard.css';
import Splayer from './Splayer'
import ReactPlayer from 'react-player'
const { SubMenu } = Menu;

// import './responsive-player.css'
class Scontent extends Component{
    state={
        toggle:false,
        watch:false,
        contenturl:'',
        player:false
    }
    componentDidMount(){
        let self = this
        axios.get('http://localhost:8000/content/'+this.props.contentname)
            .then(function (response) {
                console.log(response.data)
                self.setState({content: response.data.course })
                console.log(self.state)
            }).catch(err => {
                console.log(err)
            })
    }
    togglehad=(val)=>{
        this.setState({player:true})
        this.setState({contenturl:val})
        this.setState({toggle:false})
    }

    togg =()=>{
        this.setState({player:false})
    }
    onChange=(e)=>{
        console.log(e.target.checked)
    }
    // sendData=(val)=>{
    //     this.props.callbackPar(val)
    //     console.log('hh')
    // }
    render()
    {
        let arr
        if(this.state.content){
        arr = this.state.content.map((item,index) => {
            //return  <div><Button style={{height:70 ,width:700,marginRight:800}}  onClick={()=>this.togglehad(item.contenturl)} >{index+1}.{item.contentname}</Button><br/></div>
            return  <div><Menu.Item style={{marginBottom:40}} onClick={()=>this.togglehad(item.contenturl)} >{index+1}.{item.contentname}<Checkbox onChange={this.onChange}/></Menu.Item><br/><br/><br/></div>
        }
        )
    }
    return(
        <div>
            {this.state.content?
            <div>
              {!this.state.toggle?
              <div>{arr}</div>:null}
              {/* {this.state.player?
              <div> */}
              {/* <Splayer urli={this.state.contenturl}/></div>:null} */}
              
               {this.state.player? 
               <div><div className={"player-wrapper"}><ReactPlayer  
               className="react-player"
              url={this.state.contenturl}
              width="200%"
              height="200%"
              controls={true}
              onProgress={this.handleProgress} autoplay={true}
              /></div></div>
            
            :null} 
            </div> 
                :null}
            
            </div>
            

    )
}
}
// const mapStateToProps = (state) => {
//     return {
//         contenturl: state.course.contenturl,
//         player:state.course.player
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         get togglehad() {
//             return (val) =>
//                 dispatch({
//                     type: 'SET_URL',
//                     payload: val
//                 })
//         },
//         get onPlayer(){
//             return (val)=>
//             dispatch({
//                 type:'SET_PLAYER',
//                 payload:val
//             })
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Scontent)
export default Scontent