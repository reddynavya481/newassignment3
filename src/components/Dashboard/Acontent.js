import React, { Component } from 'react'
import { Button, Modal, Input,Card,Menu } from 'antd'
import 'antd/dist/antd.css';
import {DeleteOutlined} from '@ant-design/icons';
import { Redirect,BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import axios from 'axios'
import './Dashboard.css'
import ReactPlayer from 'react-player'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Splayer from './Splayer'
const { SubMenu } = Menu;
class Acontent extends Component{
    state={
        toggle:false,
        watch:false,
        contentname:'',
        contenturl:'',
        player:false,
        cont:true,
        content:'',
        refresh:false
    }
    componentDidMount(){
        let self = this
        axios.get('http://localhost:8000/content/'+this.props.contentname)
            .then(function (response) {
                self.setState({content: response.data.course })
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate(){
        let self = this
        if(this.state.refresh){
        axios.get('http://localhost:8000/content/'+this.props.contentname)
            .then(function (response) {
                self.setState({content: response.data.course })
                self.setState({refresh:false})

            }).catch(err => {
                console.log(err)
            })
            
    }}
    handleCancelCont = () => {
        this.setState({
            cont: false,
        });
    };
    deleteTopic=(val)=>{
       
        axios.delete("http://localhost:8000/delcont/"+val)
        this.setState({refresh:true})
    }
    togglehad=(val)=>{
        this.setState({player:true})
        this.setState({contenturl:val})
    }
    handleContentName=(e)=>{
        this.setState({contentname:e.target.value})
    }
    handleContenturl=(e)=>{
        this.setState({contenturl:e.target.value})
    }
    handleClick=()=>{
        this.setState({cont:true})
    }
    handleCont=()=>{
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                cont: false,
                confirmLoading: false,
            });
        }, 1000);
        axios.post("http://localhost:8000/content1/"+this.props.contentname,{
            contentname: this.state.topicname,
            contenturl: this.state.topicurl
        }).then(function (response) {
            NotificationManager.success('New topic Added!')
        })
            .catch(err => {
                NotificationManager.success('New content Added!')
            })
    }
    render()
    {
        let arr
        if(this.state.content){
        
        arr = this.state.content.map((item,index) => {
            return  <div><Menu.Item style={{marginBottom:30}} onClick={()=>this.togglehad(item.contenturl)} >{index+1}.{item.contentname}<DeleteOutlined onClick={()=>this.deleteTopic(item.contentname)}/></Menu.Item></div>
        }
        )
    }
    return(
        <div>
            <div>
            {this.state.content?
            <div>
              {!this.state.toggle?
              <div>{arr}</div>:null}
              {this.state.player && this.state.refresh?
              <div>
              <Splayer urli={this.state.contenturl}/></div>:null}
            </div>:null }
            </div>
            <NotificationContainer/>
            </div>
    )
}
}

export default Acontent