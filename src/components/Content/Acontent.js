import React, { Component } from 'react'
import {  Menu } from 'antd'
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios'
import './Content.css'
import ReactPlayer from 'react-player'
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
// import Splayer from './Splayer'
// const { SubMenu } = Menu;
class Acontent extends Component {
    state = {
        toggle: false,
        watch: false,
        contentname: '',
        contenturl: '',
        player: false,
        cont: true,
        content: '',
        refresh: false
    }
    componentDidMount() {
        let self = this
        axios.get('http://localhost:8000/content/' + this.props.contentname)
            .then(function (response) {
                self.setState({ content: response.data.course })
            }).catch(err => {
                console.log(err)
            })
    }
    componentDidUpdate() {
        let self = this
        if (this.state.refresh) {
            axios.get('http://localhost:8000/content/' + this.props.contentname)
                .then(function (response) {
                    self.setState({ content: response.data.course })
                    self.setState({ refresh: false })
                }).catch(err => {
                    console.log(err)
                })

        }
    }
    deleteCont = (val) => {

        axios.delete("http://localhost:8000/delcont/" + val)
        this.setState({ player: false })
        this.setState({ refresh: true })
    }
    togglehad = (val) => {
        this.setState({ player: true })
        this.setState({ contenturl: val })
        this.setState({ refresh: true })
    }

    render() {
        let arr
        if (this.state.content) {
            arr = this.state.content.map((item, index) => {
                return <div><Menu.Item style={{ marginBottom: 30 }} onClick={() => this.togglehad(item.contenturl)} >{index + 1}.{item.contentname}<DeleteOutlined onClick={() => this.deleteCont(item.contentname)} /></Menu.Item></div>
            }
            )
        }
        return (
            <div>
                <div>
                    {this.state.content ?
                        <div>

                            {!this.state.toggle ?
                                <div>{arr}</div> : null}
                            {this.state.player ?
                                <div>
                                    <div className="player-wrapper"><ReactPlayer
                                        className="react-player"
                                        url={this.state.contenturl}
                                        autoplay={true}
                                        width="200%"
                                        height="200%"
                                        controls={true}
                                        onProgress={this.handleProgress}
                                    /></div>
                                </div> : null}
                        </div> : null}
                </div>
                <NotificationContainer />
            </div>
        )
    }
}

export default Acontent