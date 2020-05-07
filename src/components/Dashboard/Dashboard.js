//Class Component for Adashboard

// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { Button, Modal, Input, Row, Col, Card,Popover} from 'antd'
// import { UserOutlined ,EditOutlined,LogoutOutlined,DeleteOutlined} from '@ant-design/icons';
// import Atopics from './Atopics'
// import axios from 'axios'
// import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// import 'antd/dist/antd.css';
// const { TextArea } = Input
// const { Meta } = Card
// class Dashboard extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             ModalText: 'Content of the modal',
//             visible: false,
//             confirmLoading: false,
//             coursename: '',
//             authorname: '',
//             description: '',
//             toggle: false,
//             display: "",
//             editable:false,
//             id:''
//         }
//     }
//     componentDidMount() {
//         let self = this
//         axios.get('http://localhost:8000/getcourse')
//             .then(function (response) {
//                 console.log(response.data)
//                 self.setState({ display: response.data.course })
//                 localStorage.setItem("coursetoken", response.data.token)
//             }).catch(err => {
//                 console.log(err)
//             })
//     }
//     shouldComponentUpdate(nextState){
//         const per2=this.state.coursename!==nextState.coursename
//         return per2
//     }
//     componentDidUpdate() {
//         let self = this
//         axios.get('http://localhost:8000/getcourse')
//             .then(function (response) {
//                 // console.log(response.data)
//                 self.setState({ display: response.data.course })
//                 localStorage.setItem("coursetoken", response.data.token)
//             }).catch(err => {
//                 console.log(err)
//             })
//     }
//     clickHandler = (val) => {
//         this.setState({ toggle: true })
//         this.setState({ coursename: val })
//     }
//     togglehad = () => {
//         this.setState({ toggle: false })
//     }
//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };
//     showEditModal = (val,val1,val2,val3) => {
//         this.setState({
//             editable: true,
//             id:val
//         });
//         this.setState({coursename:val1,authorname:val2,description:val3})
//         console.log(this.state.id+' '+val)
//     };
//     handleedit=()=>{
//         this.setState({
//             confirmLoading: true,
//         });
//         setTimeout(() => {
//             this.setState({
//                 editable: false,
//                 confirmLoading: false,
//             });
//         }, 1000);
//         axios.put("http://localhost:8000/course/"+this.state.id,{
//             coursename: this.state.coursename,
//             authorname: this.state.authorname,
//             description: this.state.description
//         }).then(function (response) {
//             // console.log(response);
//             NotificationManager.success('course Edited!')
//         })
//             .catch(err => {
//                 // console.log(err)
//                 NotificationManager.error('Try again')
//             })
//             this.setState({coursename:''})
//             this.setState({authorname:''})
//             this.setState({description:''})
//     }
//     handleOk = () => {
//         this.setState({
//             confirmLoading: true,
//         });
//         setTimeout(() => {
//             this.setState({
//                 visible: false,
//                 confirmLoading: false,
//             });
//         }, 1000);
//         axios.post("http://localhost:8000/course",{
//             coursename: this.state.coursename,
//             authorname: this.state.authorname,
//             description: this.state.description
//         }).then(function (response) {
//             NotificationManager.success('New course Added!')
//         })
//             .catch(err => {
//                 NotificationManager.error('Try again')
//             })
//             this.setState({coursename:''})
//             this.setState({authorname:''})
//             this.setState({description:''})
//     };
//     handleCancel = () => {
//         this.setState({
//             visible: false,
//         });
//     };
//     handleCancelEdit = () => {
//         this.setState({
//             editable: false,
//         });
//     };
//     courseName = (e) => {
//         this.setState({ coursename: e.target.value })
//     }
//     authorName = (e) => {
//         this.setState({ authorname: e.target.value })
//     }
//     description = (e) => {
//         this.setState({ description: e.target.value })
//     }
//     deleteCard=(val)=>{
//         axios.delete("http://localhost:8000/delete/"+val)
//     }
//     render() {
//         return (
//             <div>
//                 <div>
//                     <UserOutlined style={{ fontSize: '26px' ,marginLeft: '1100px'}} />
//                     <h2 style={{  marginLeft: '1150px' }}>Hi {this.props.username}</h2>
//                     <Popover content={"logout ?"}>
//                     <LogoutOutlined onClick={this.props.logout} style={{ marginLeft: '1100px' }}/>
//                     </Popover>
//                 </div>

//                 <Modal
//                     title="New Course"
//                     visible={this.state.visible}
//                     onOk={this.handleOk}
//                     confirmLoading={this.state.confirmLoading}
//                     onCancel={this.handleCancel}
//                 >
//                     <label>add course name</label>
//                     <Input type="text" onChange={this.courseName} />
//                     <label>add author name</label>
//                     <Input type="text" onChange={this.authorName} />
//                     <label>Add description</label>
//                     <TextArea rows={4} onChange={this.description} />
//                 </Modal>
//                 <Modal
//                     title="Edit Course"
//                     visible={this.state.editable}
//                     onOk={this.handleedit}
//                     confirmLoading={this.state.confirmLoading}
//                     onCancel={this.handleCancelEdit}
//                 >
//                     <label>change course name</label>
//                     <Input type="text" onChange={this.courseName} value={this.state.coursename}/>
//                     <label>change author name</label>
//                     <Input type="text" onChange={this.authorName} value={this.state.authorname}/>
//                     <label>change description</label>
//                     <TextArea rows={4} onChange={this.description} value={this.state.description}/>
//                 </Modal>
//                 {!this.state.toggle ?
//                     <div>
//                         <Button onClick={this.showModal} type="dashed">+Add a new Course</Button>
//                         <h2>Courses added by you</h2>
//                         {this.state.display ?
//                             <div className="site-card-wrapper">
//                                 <Row gutter={16}>
//                                     {this.state.display.map(item =>
//                                         <Col span={6}>
//                                             <Card style={{ marginRight: 10, width: 300,marginBottom:5 }} extra={<Button onClick={() => this.clickHandler(item.coursename)}>Check</Button>} actions={[
//                                             <EditOutlined key="edit" onClick={()=>this.showEditModal(item.id,item.coursename,item.authorname,item.description)}/>,<Popover content={"delete?"}><DeleteOutlined onClick={()=>this.deleteCard(item.coursename)}/></Popover>]}>
//                                                 <Meta
//                                                     title={item.coursename}
//                                                     description={`By ${item.authorname} \n ${item.description}`}
//                                                 />
//                                             </Card>
//                                         </Col>)}
//                                 </Row>
//                             </div> : null
//                         }
//                     </div> :
//                     <div>
//                         <Button onClick={this.togglehad} style={{ marginRight: '1100px' }}>Back</Button>
//                         <Atopics coursename={this.state.coursename} />
//                     </div>}
//             <NotificationContainer/>
//             </div>
//         )
//     }
// }


// const mapStateToProps = (state) => {
//     return {
//         username: state.course.username,
//         password: state.course.password,
//         typ: state.course.typ

//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         get onLogout() {
//             return () =>
//                 dispatch({
//                     type: 'SET_LOGOUT',
//                     payload: ''
//                 })
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
