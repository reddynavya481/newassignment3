import React, { Component } from 'react'
import { Menu } from 'antd'
import 'antd/dist/antd.css';
import axios from 'axios'
import Scontent from '../Content/Scontent'
const { SubMenu } = Menu;

class Stopics extends Component{
    state={
        toggle:false,
        watch:false,
        contentname:'',
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
    
    render(){
        let arr
        if(this.state.display){
        arr = this.state.display.map((item,index) => {
            return <div>
                <Menu onClick={this.handleMenuClick}
                style={{ width:256,marginRight:902,marginTop:5}}
                mode="inline"> 
                <SubMenu
                key={`sub${index}`}
                title={
                <span>{item.topicname}</span>}>
                
                <Scontent contentname={item.topicname}/>
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
                </div> 
                    :null
                }
                </div>
        )
    }
}

export default Stopics

