import React, { Component } from 'react'
// import { connect } from 'react-redux';
import { Button, Modal, Input,Card,Menu } from 'antd'
import 'antd/dist/antd.css';
import { Redirect,BrowserRouter,Link,Switch,Route} from 'react-router-dom'
import jwt from 'jsonwebtoken';
import axios from 'axios'
import './Dashboard.css'
import ReactPlayer from 'react-player'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Splayer from './Splayer'
const { SubMenu } = Menu;
// import './responsive-player.css'
class Scontent extends Component{
    state={
        toggle:false,
        watch:false,
        contentname:'',
        contenturl:'',
        player:false,
        cont:true,
        content:''
    }
    componentDidMount(){
        let self = this
        axios.get('http://localhost:8000/content/'+this.props.contentname)
            .then(function (response) {
                // console.log(response.data)
                self.setState({content: response.data.course })
                // console.log(self.state)
            }).catch(err => {
                console.log(err)
            })
    }
    shouldComponentUpdate(nextState){
        // let self = this
        // axios.get('http://localhost:8000/content/'+this.props.contentname)
        //     .then(function (response) {
        //         self.setState({content: response.data.course })

        //     }).catch(err => {
        //         console.log(err)
        //     })
        const per=this.state.contentname!==nextState.contentname
        const per4=this.state.contenturl!==nextState.contenturl
            return per||per4
    }
    componentDidUpdate(){
        let self = this
        axios.get('http://localhost:8000/content/'+this.props.contentname)
            .then(function (response) {
                self.setState({content: response.data.course })

            }).catch(err => {
                console.log(err)
            })
            
    }

    handleCancelCont = () => {
        // console.log('Clicked cancel button');
        this.setState({
            cont: false,
        });
    };
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
    // sendData=(val)=>{
    //     this.props.callbackPar(val)
    //     console.log('hh')
    // }
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
            // console.log(response);
            NotificationManager.success('New topic Added!')
        })
            .catch(err => {
                // console.log(err)
                NotificationManager.error('Try again')
            })
    }
    render()
    {
        let arr
        if(this.state.content){
        
        arr = this.state.content.map((item,index) => {
            //return  <div><Button style={{height:70 ,width:700,marginRight:800}}  onClick={()=>this.togglehad(item.contenturl)} >{index+1}.{item.contentname}</Button><br/></div>
            return  <div><Menu.Item style={{marginBottom:30}} onClick={()=>this.togglehad(item.contenturl)} >{index+1}.{item.contentname}</Menu.Item></div>
        }
        )
        // arr.push(<Menu.Item style={{marginBottom:40}} onClick={()=>this.handleClick()}>+add new content</Menu.Item>)
    }
    return(
        <div>
            {this.state.content?
            <div>
              {!this.state.toggle?
              <div>{arr}</div>:null}
              {this.state.player?
              <div>
              <Splayer urli={this.state.contenturl}/></div>:null}
              {/* <Modal
                    title="New Content"
                    visible={this.state.cont}
                    onOk={this.handleCont}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.handleCancelCont}
                >
                    <label>add content name</label>
                    <Input type="text" onChange={this.handleContentName} />
                    <label>paste url</label>
                    <Input type="text" onChange={this.handleContenturl} />
                </Modal> */}
              
            </div> 
                :null
            }
            <NotificationContainer/>
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