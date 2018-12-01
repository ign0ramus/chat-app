import React, { Component } from 'react'
import io from 'socket.io-client';

import LoginForm from '../components/LoginForm';
import Chat from '../components/Chat/Chat';

const socketUrl = '/';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            user: null
        };
    }

    componentWillMount() {
        this.initSocket();
    }

    // подключает сокет
    initSocket = () => {
        /* без опции {transports: ['websocket']} chrome блокирует http запрос 
        из-за CORS Policy при использовании devServer и socket.io */
        const socket = io(socketUrl);

        this.setState({ socket });
    };

    /** Устанавливает свойства пользователя в state
    * @param {object} user {id: number, name: string, room: string}
    */
    setUser = (user) => {
        const { socket } = this.state;
        socket.emit('USER_CONNECTED', user)
        this.setState({ user });
    };

    render() {
        let content;
        if (!this.state.user) {
            content = <LoginForm 
                                socket={this.state.socket} 
                                setUser={this.setUser} />;
        } else {
            content = <Chat
                            socket={this.state.socket} 
                            user={this.state.user} />;
            
        }
        return content;
    }
}
