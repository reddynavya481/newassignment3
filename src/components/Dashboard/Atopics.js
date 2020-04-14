import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input,Card } from 'antd'
import 'antd/dist/antd.css';
import { Redirect,BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import axios from 'axios'
import './Dashboard.css'
import ReactPlayer from 'react-player'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Atopics extends Component{
    state={
        toggle:false,
        watch:false,
        topicurl:'',
        topicname:'',
        confirmLoading: false,
        player:false,
        show:false
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
            topicname: this.state.topicname,
            topicurl: this.state.topicurl
        }).then(function (response) {
            // console.log(response);
            NotificationManager.success('New topic Added!')
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
        });
    };

    render(){
        let arr
        let arr2
        if(this.state.display){
        arr = this.state.display.map((item,index) => {
            return  <div style={{ marginRight: '1000px' }} className="block-example border border-dark"><Button onClick={()=>this.togglehad(item.topicurl)} >{index+1}.{item.topicname}</Button><br/></div>
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
                    title="New Course"
                    visible={this.state.show}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <label>add topic name</label>
                    <Input type="text" onChange={this.handleTopicName} />
                    <label>paste url</label>
                    <Input type="text" onChange={this.handleTopicurl} />
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
            </div>
        )
    }
}
export default Atopics