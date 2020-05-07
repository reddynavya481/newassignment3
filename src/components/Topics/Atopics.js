import React, { Component } from 'react'
import { Button, Modal, Input, Menu, Popover } from 'antd'
import 'antd/dist/antd.css';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Topics.css'
import Acontent from '../Content/Acontent'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
const { SubMenu } = Menu;
class Atopics extends Component {
    state = {
        toggle: false,
        watch: false,
        contenturl: '',
        topicname: '',
        topicid:'',
        newtopicname:'',
        contentname: '',
        confirmLoading: false,
        player: false,
        show: false,
        cont: false,
        show1: false,
        refresh: false,
        refreshcont:false
    }    
    componentDidMount() {
        let self = this
        axios.get('http://localhost:8000/topic/' + this.props.coursename)
            .then(function (response) {
                console.log(response.data)
                self.setState({ display: response.data.course })
                console.log(self.state)
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate() {
        if (this.state.refresh) {
            let self = this
            // console.log("hellllo")
            axios.get('http://localhost:8000/topic/' + this.props.coursename)
                .then(function (response) {
                    self.setState({ display: response.data.course })
                    // console.log(self.state.display)
                    self.setState({ refresh: false })
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    handleTopicName=(e)=>{
        this.setState({topicname:e.target.value})
    }
    handleTopicNameU = (e) => {
        this.setState({ newtopicname: e.target.value })
    }
    handleTopicurl = (e) => {
        this.setState({ topicurl: e.target.value })
    }
    togglehad = (val) => {
        this.setState({ player: true })
        this.setState({ topicurl: val })
    }
    handleProgress = ({ played }) => {
        if (played > 0.7 && !this.state.watch) {
            this.setState({ watch: true })
        }
    }
    handleTopic = () => {
        this.setState({ show: true })
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
        let self = this
        axios.post("http://localhost:8000/topic1/" + this.props.coursename, {
            topicname: this.state.topicname
        }).then(function (response) {
            self.setState({ refresh: true })
            NotificationManager.success('New topic Added!')
        })
            .catch(err => {
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
        let self=this
        axios.patch("http://localhost:8000/topic3/" + this.state.topicname, {
            topicname: this.state.newtopicname
        }).then(function (response) {
            self.setState({ refresh: true })
            NotificationManager.success(' Topic Edited!')
        })
            .catch(err => {
                NotificationManager.error('Try again')
            })
        // this.setState({ topicname: '' })
    }
    handleCancel = () => {
        this.setState({
            show: false,
            cont: false,
            show1: false
        });
    };

    handleContentName = (e) => {
        this.setState({ contentname: e.target.value })
    }
    handleContenturl = (e) => {
        this.setState({ contenturl: e.target.value })
    }
    handleButtonClick = (val) => {
        this.setState({ topicname: val })
        this.setState({ cont: true })
    }
    deleteTopic = (val) => {

        axios.delete("http://localhost:8000/del/" + val)
        this.setState({ refresh: true })
    }
    editTopicName = (val) => {
        this.setState({ topicname: val })
        this.setState({ show1: true })
    }
    // handleSubMenuClick=()=>{
    //     this.setState({refresh:true})
    // }
    handleCont = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                cont: false,
                confirmLoading: false,
            });
        }, 1000);
        let self = this
        axios.post("http://localhost:8000/content1/" + this.state.topicname, {
            contentname: this.state.contentname,
            contenturl: this.state.contenturl
        }).then(function (response) {
            self.setState({ refreshcont: true })
            NotificationManager.success('New content Added!')
          
        })
            .catch(err => {
                NotificationManager.error('Try again')
            })
    }
    render() {
        let arr
        if (this.state.display) {
            arr = this.state.display.map((item, index) => {
                return <div>
                    <Menu onClick={this.handleMenuClick}
                        style={{ width: 300, marginRight: 902, marginTop: 5 }}
                        mode="inline">
                        <SubMenu 
                            title={
                                <span><Popover content={"add content"}>
                                    <PlusOutlined onClick={() => this.handleButtonClick(item.topicname)} style={{ marginRight: 15 }} />
                                </Popover>
                                    <DeleteOutlined onClick={() => this.deleteTopic(item.topicname)} />
                                    <EditOutlined onClick={() => this.editTopicName(item.topicname)} style={{ marginLeft: 10 }} />{index + 1}.{item.topicname}</span>}>
                            <Acontent contentname={item.topicname} />
                        </SubMenu>
                    </Menu>
                </div>
            })
        }
        return (
            <div>
                {this.state.refreshcont?<Atopics coursename={this.props.coursename}/>:
                <div>
                    <h2>CourseName : {this.props.coursename}</h2>
                    <Button onClick={() => this.handleTopic()}>Add new topic</Button>
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
                        <Input type="text" onChange={this.handleTopicNameU} value={this.state.newtopicname} />
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
                    {this.state.display ?
                        <div>
                            {!this.state.toggle ?
                                <div>{arr}</div> : null}
                            {/* {this.state.player?
                  <div><div className="player-wrapper"><ReactPlayer 
                  className="react-player"
                  url={this.state.topicurl}
                  width="50%"
                  height="50%"
                  controls={true}
                  onProgress={this.handleProgress}
                  /></div><div>{this.state.watch}</div></div>:null} */}
                        </div>
                        : null
                    }</div>}
                <NotificationContainer />
            </div>
        )
    }
}
export default Atopics