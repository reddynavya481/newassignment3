import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input,Card,Menu ,Checkbox} from 'antd'
import 'antd/dist/antd.css';
import { Redirect,BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import axios from 'axios'
// import './Dashboard.css'
import Scontent from './Scontent'
import ReactPlayer from 'react-player'
const { SubMenu } = Menu;
// import './responsive-player.css'
class Stopics extends Component{
    state={
        toggle:false,
        watch:false,
        contentname:'',
        // player:false,
        // showContentPage:false,
        // openKeys:['sub0'],
    }
    // rootSubmenuKeys = ['sub0','sub1', 'sub2', 'sub3','sub4'];
    componentDidMount(){
        let self = this
        axios.get('http://localhost:8000/topic/'+this.props.coursename)
            .then(function (response) {
                console.log(response.data)
                self.setState({ display: response.data.course })
                console.log(self.state)
            }).catch(err => {
                console.log(err)
            })
    }
    togglehad=(val)=>{
        this.setState({player:true})
        this.setState({contenturl:val})
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    handleMenuClick = e => {
        console.log('click ', e);
      };
    // handleProgress=({played})=>{
    //     if(played>0.7 && !this.state.watch){
    //         this.setState({watch:true})
    //     }
    // }
    // showContent=(val)=>{
    //     this.setState({contentname:val})
    //     this.setState({showContentPage:!this.state.showContentPage})

    // }
    // onOpenChange = openKeys => {
    //     const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    //     if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //       this.setState({ openKeys });
    //     } else {
    //       this.setState({
    //         openKeys: latestOpenKey ? [latestOpenKey] : [],
    //       });
    //     }
    //   };
    
    render(){
        let arr
        let arr2
        if(this.state.display){
        arr = this.state.display.map((item,index) => {
           
            // return  <div><Button style={{height:70 ,width:700,marginRight:800}}  onClick={()=>this.showContent(item.topicname)} >{index+1}.{item.topicname}</Button><br/></div>
            return <div>
                <Menu onClick={this.handleMenuClick}
                style={{ width:256,marginRight:902,marginTop:5}}
                mode="inline"> 
                <SubMenu
                // style={{ fontSize:'40px',fontWeight:'bold'}}
                key={`sub${index}`}
                title={
                <span>{item.topicname}</span>}>
                
                <Scontent contentname={item.topicname}/>
                {/* {this.state.content.map((item1,index1)=>{
                    return (<Menu.Item key={index1} onClick={()=>this.togglehad(item1.contenturl)}>{item1.contentname}</Menu.Item>
                )})} */}
                
        </SubMenu>
      </Menu>
           </div>
        })
        
    }
        return(
            <div> 
                {this.state.display?
                <div>
                  {!this.state.toggle?
                  <div >{arr}</div>:null}
                {/* //   :null}
                //   {this.state.showContentPage? */}
                    {/* <Scontent contentname={this.state.contentname}/>} */}
                    {/* // :null} */}
                  {/* {this.state.player?
                  <div><div className="player-wrapper"><ReactPlayer 
                  className="react-player"
                  url={this.state.contenturl}
                  width="50%"
                  height="50%"
                  controls={true}
                  onProgress={this.handleProgress}
                  /></div><div>{console.log(this.props.player)}</div></div>:null} */}
                </div> 
                    :null
                }
                </div>
        )
    }
}

export default Stopics

