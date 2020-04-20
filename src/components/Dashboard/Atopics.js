import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input,Card,Menu,Popover } from 'antd'
import 'antd/dist/antd.css';
import {PlusOutlined,EditOutlined} from '@ant-design/icons';
import { Redirect,BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import axios from 'axios'
import './Dashboard.css'
import Acontent from './Acontent'
import ReactPlayer from 'react-player'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const { SubMenu } = Menu;
class Atopics extends Component{
    state={
        toggle:false,
        watch:false,
        contenturl:'',
        topicname:'',
        contentname:'',
        confirmLoading: false,
        player:false,
        show:false,
        cont:false,
        show1:false
    }
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
    shouldComponentUpdate(nextState){
        const per1=this.state.topicname!==nextState.topicname
        // const per3=this.state.
        return per1
    }
    componentDidUpdate(){
        let self = this
        axios.get('http://localhost:8000/topic/'+this.props.coursename)
            .then(function (response) {
                // console.log(response.data)
                self.setState({ display: response.data.course })
                // console.log(self.state)
            }).catch(err => {
                console.log(err)
            })
    }
    
    handleTopicName=(e)=>{
        this.setState({topicname:e.target.value})
    }
    handleTopicurl=(e)=>{
        this.setState({topicurl:e.target.value})
    }
    togglehad=(val)=>{
        this.setState({player:true})
        this.setState({topicurl:val})
    }
    handleProgress=({played})=>{
        if(played>0.7 && !this.state.watch){
            this.setState({watch:true})
        }
    }
    handleTopic=()=>{
        this.setState({show:true})
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                show: false,
                confirmLoading: false,
            });
        }, 1000);
        axios.post("http://localhost:8000/topic1/"+this.props.coursename,{
            topicname: this.state.topicname
            // topicurl: this.state.topicurl
        }).then(function (response) {
            // console.log(response);
            NotificationManager.success('New topic Added!')
        })
            .catch(err => {
                // console.log(err)
                NotificationManager.error('Try again')
            })
    }
    handleOk1 = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                show1: false,
                confirmLoading: false,
            });
        }, 1000);
        axios.put("http://localhost:8000/topic3/"+this.state.topicid,{
            topicname: this.state.topicname
            // topicurl: this.state.topicurl
        }).then(function (response) {
            // console.log(response);
            NotificationManager.success(' topic Edited!')
        })
            .catch(err => {
                // console.log(err)
                NotificationManager.error('Try again')
            })
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            show: false,
            cont:false,
            show1:false
        });
    };
  
    handleContentName=(e)=>{
        this.setState({contentname:e.target.value})
    }
    handleContenturl=(e)=>{
        this.setState({contenturl:e.target.value})
    }
    handleButtonClick=(val)=>{
        this.setState({topicname:val})
        this.setState({cont:true})
    }
    editTopicName=(val)=>{
        this.setState({topicid:val})
        this.setState({show1:true})
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
        axios.post("http://localhost:8000/content1/"+this.state.topicname,{
            contentname: this.state.contentname,
            contenturl: this.state.contenturl
        }).then(function (response) {
            // console.log(response);
            NotificationManager.success('New content Added!')
        })
            .catch(err => {
                // console.log(err)
                NotificationManager.error('Try again')
            })
    }

    render(){
        let arr
        let arr2
        if(this.state.display){
            arr = this.state.display.map((item,index) => {
               
                // return  <div><Button style={{height:70 ,width:700,marginRight:800}}  onClick={()=>this.showContent(item.topicname)} >{index+1}.{item.topicname}</Button><br/></div>
                return <div>
                    <Menu onClick={this.handleMenuClick}
                    style={{ width:256 ,marginRight:902,marginTop:5}}
                    mode="inline"> 
                    <SubMenu
                    // style={{ fontSize:50 }}
                    
                    title={
                    <span><EditOutlined onClick={()=>this.editTopicName(item.id)}/>{index+1}.{item.topicname}<Popover content={"add content"}><Button onClick={()=>this.handleButtonClick(item.topicname)} icon={<PlusOutlined/>}/></Popover></span>}>
                    {/* <Menu.Item onClick={}>+Add Content</Menu.Item> */}
                    <Acontent contentname={item.topicname}/>
                    {/* {this.state.content.map((item1,index1)=>{
                        return (<Menu.Item key={index1} onClick={()=>this.togglehad(item1.contenturl)}>{item1.contentname}</Menu.Item>
                    )})} */}
                    
            </SubMenu>
          </Menu>
               </div>
            })
        arr2 = this.state.display.map((item,index) => {
            return <div className="player-wrapper"><ReactPlayer 
            className="react-player"
            url={item.topicurl}
            width="50%"
            height="50%"
            controls={true}
            onProgress={this.handleProgress}
            /></div>
        })
    }
        return(
            <div>
                <Button onClick={()=>this.handleTopic()}>Add new topic</Button>
                <Modal
                    title="New Topic"
                    visible={this.state.show}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <label>add topic name</label>
                    <Input type="text" onChange={this.handleTopicName} />
                </Modal>
                <Modal
                    title="Edit Topic"
                    visible={this.state.show1}
                    onOk={this.handleOk1}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <label>edit topic name</label>
                    <Input type="text" onChange={this.handleTopicName} />
                </Modal>
                <Modal
                    title="New Content"
                    visible={this.state.cont}
                    onOk={this.handleCont}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <label>add content name</label>
                    <Input type="text" onChange={this.handleContentName} />
                    <label>paste url</label>
                    <Input type="text" onChange={this.handleContenturl} />
                </Modal>
                {this.state.display?
                <div>
                  {!this.state.toggle?
                  <div>{arr}</div>:null}
                  {this.state.player?
                  <div><div className="player-wrapper"><ReactPlayer 
                  className="react-player"
                  url={this.state.topicurl}
                  width="50%"
                  height="50%"
                  controls={true}
                  onProgress={this.handleProgress}
                  /></div><div>{this.state.watch}</div></div>:null}
                </div> 
                    :null
                }
                <NotificationContainer/>
            </div>
        )
    }
}
export default Atopics