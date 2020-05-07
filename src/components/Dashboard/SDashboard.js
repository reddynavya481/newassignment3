//class component for Sdashboard1


// import React, { Component } from 'react'
// import { connect } from 'react-redux';
// import { Button, Modal,  Card ,Popover} from 'antd'
// import { Redirect, BrowserRouter, Link, Switch, Route } from 'react-router-dom'
// import 'antd/dist/antd.css';
// import jwt from 'jsonwebtoken';
// import axios from 'axios'
// import Stopics from './Stopics'
// import { Row, Col } from 'antd';
// import { UserOutlined,LogoutOutlined } from '@ant-design/icons';
// const { TextArea } = Input
// const { Meta } = Card;
// class SDashboard extends Component {
//     state = {
//         display: "",
//         click: false,
//         coursename: '',
//         toggle: false
//     }
//     componentDidMount() {
//         const token = localStorage.getItem("token")
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
//     clickHandler = (val) => {
//         this.setState({ toggle: true })
//         this.setState({ coursename: val })
//     }
//     togglehad = () => {
//         this.setState({ toggle: false })
//     }
//     render() {
//         return (
//             <div>
//                 <div>
//                     <span><h1>Explore our Courses </h1></span>
//                     <span><UserOutlined style={{ fontSize: '26px' ,marginRight: '1100px'}} /></span>
//                     <span><h2 style={{  marginRight: '1100px' }}>Hi {this.props.username}</h2></span>
//                     <Popover content={"logout ?"}>
//                     <Button onClick={
//                     this.props.logout
//                     } style={{ marginLeft: '1100px',marginBottom:'10px' }} icon={<LogoutOutlined />}></Button>
//                     </Popover>
//                 </div>
//                 {!this.state.toggle ?
//                     <div>
//                         {this.state.display ?
//                                 <div className="site-card-wrapper">
//                                     <Row gutter={16}>
//                                         {this.state.display.map(item =>
//                                             <Col span={6}>
//                                                 <Card style={{ marginRight: 13, width: 300 ,marginBottom:8}} extra={<Button onClick={() => this.clickHandler(item.coursename)}>Register</Button>}>
//                                                     <Meta
//                                                         title={item.coursename}
//                                                         description={`By ` + `${item.authorname}` + '\n ' + `${item.description}`}
//                                                     />
//                                                 </Card>
//                                             </Col>)}
//                                     </Row>
//                                 </div>: null
//                         }
//                     </div> :
//                     <div>
//                         <Button onClick={this.togglehad} style={{marginRight:'1100px'}}>Back</Button>
//                         <Stopics coursename={this.state.coursename} />
//                     </div>}
//             </div>
//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         username: state.course.username,
//         password: state.course.password,
//         typ: state.course.typ,
//         coursename: state.course.coursename

//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         get onLogout() {
//             return () =>
//                 dispatch({
//                     type: 'SET_LOGOUT'
//                 })
//         },
//     }

// }
// export default connect(mapStateToProps, mapDispatchToProps)(SDashboard);
