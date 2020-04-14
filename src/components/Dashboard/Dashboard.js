import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input, Row, Col, Card,Popover} from 'antd'
import { UserOutlined ,EditOutlined,LogoutOutlined} from '@ant-design/icons';
import Atopics from './Atopics'
import axios from 'axios'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
const { TextArea } = Input
const { Meta } = Card
// const {  LogoutOutlined  } = icons;
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            coursename: '',
            authorname: '',
            description: '',
            toggle: false,
            display: "",
            editable:false,
            id:''
        }
    }
    componentDidMount() {
        const token = localStorage.getItem("token")
        let self = this
        axios.get('http://localhost:8000/getcourse')
            .then(function (response) {
                console.log(response.data)
                self.setState({ display: response.data.course })
                localStorage.setItem("coursetoken", response.data.token)
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate() {
        const token = localStorage.getItem("token")
        let self = this
        axios.get('http://localhost:8000/getcourse')
            .then(function (response) {
                // console.log(response.data)
                self.setState({ display: response.data.course })
                localStorage.setItem("coursetoken", response.data.token)
            }).catch(err => {
                console.log(err)
            })
    }
    clickHandler = (val) => {
        this.setState({ toggle: true })
        this.setState({ coursename: val })
    }
    togglehad = () => {
        this.setState({ toggle: false })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    showEditModal = (val) => {
        this.setState({
            editable: true,
            id:val
        });
        console.log(this.state.id+' '+val)
    };
    handleedit=()=>{
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                editable: false,
                confirmLoading: false,
            });
        }, 1000);
        axios.put("http://localhost:8000/course/"+this.state.id,{
            coursename: this.state.coursename,
            authorname: this.state.authorname,
            description: this.state.description
        }).then(function (response) {
            console.log(response);
            NotificationManager.success('course Edited!')
        })
            .catch(err => {
                console.log(err)
                NotificationManager.error('Try again')
            })
    }
    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 1000);
        axios.post("http://localhost:8000/course",{
            coursename: this.state.coursename,
            authorname: this.state.authorname,
            description: this.state.description
        }).then(function (response) {
            // console.log(response);
            NotificationManager.success('New course Added!')
        })
            .catch(err => {
                console.log(err)
                NotificationManager.error('Try again')
            })
    };
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    handleCancelEdit = () => {
        console.log('Clicked cancel button');
        this.setState({
            editable: false,
        });
    };
    courseName = (e) => {
        this.setState({ coursename: e.target.value })
    }
    authorName = (e) => {
        this.setState({ authorname: e.target.value })
    }
    description = (e) => {
        this.setState({ description: e.target.value })
    }
    render() {
        return (
            <div>
                <div>
                    <UserOutlined style={{ fontSize: '26px' ,marginLeft: '1100px'}} />
                    <h2 style={{  marginLeft: '1150px' }}>Hi {this.props.username}</h2>
                    <Popover content={"logout ?"}>
                    <Button onClick={this.props.onLogout} style={{ marginLeft: '1100px' }} icon={<LogoutOutlined />}></Button>
                    </Popover>
                </div>
                
                <Modal
                    title="New Course"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <label>add course name</label>
                    <Input type="text" onChange={this.courseName} />
                    <label>add author name</label>
                    <Input type="text" onChange={this.authorName} />
                    <label>Add description</label>
                    <TextArea rows={4} onChange={this.description} />
                </Modal>
                <Modal
                    title="Edit Course"
                    visible={this.state.editable}
                    onOk={this.handleedit}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancelEdit}
                >
                    <label>change course name</label>
                    <Input type="text" onChange={this.courseName} />
                    <label>change author name</label>
                    <Input type="text" onChange={this.authorName} />
                    <label>change description</label>
                    <TextArea rows={4} onChange={this.description} />
                </Modal>
                {!this.state.toggle ?
                    <div>
                        <Button onClick={this.showModal} type="dashed">+Add a new Course</Button>
                        <h2>Courses added by you</h2>
                        {this.state.display ?
                            <div className="site-card-wrapper">
                                <Row gutter={16}>
                                    {this.state.display.map(item =>
                                        <Col span={6}>
                                            <Card style={{ marginRight: 10, width: 300,marginBottom:5 }} extra={<Button onClick={() => this.clickHandler(item.coursename)}>Register</Button>} actions={[
                                            <EditOutlined key="edit" onClick={()=>this.showEditModal(item.id)}/>]}>
                                                <Meta
                                                    title={item.coursename}
                                                    description={`By ` + `${item.authorname}` + '\n ' + `${item.description}`}
                                                />
                                            </Card>
                                        </Col>)}
                                </Row>
                            </div> : null
                        }
                    </div> :
                    <div>
                        <Button onClick={this.togglehad} style={{ marginRight: '1100px' }}>Back</Button>
                        <Atopics coursename={this.state.coursename} />
                    </div>}

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        username: state.course.username,
        password: state.course.password,
        typ: state.course.typ

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        get onLogout() {
            return () =>
                dispatch({
                    type: 'SET_LOGOUT',
                    payload: ''
                })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
