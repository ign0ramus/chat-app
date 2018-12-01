import React, { Component } from 'react'
import moment from 'moment';
import uniqid from 'uniqid';

import Message from './Message/Message';

export default class Messages extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }
    }

    componentWillMount() {
        const { socket } = this.props;

        socket.on('NEW_MESSAGE', message => {
            message.time = moment(message.time).format('HH:mm');
            const messages = this.state.messages.slice();
            messages.push(message);

            this.setState({ messages });
            this.scrollToBottom();
        })
    }

    scrollToBottom = () => {
        // прокручивает контейнер сообщений вниз, если новое сообщение видно на экране

        // селекторы
        const messages = document.getElementById('msgs');
        const newMessage = messages.lastElementChild;
        const lastMessage = newMessage.previousElementSibling;
        // высоты
        const messagesHeight = messages.clientHeight;
        const messagesScrollTop = messages.scrollTop;
        const messagesScrollHeight = messages.scrollHeight;
    
        const newMessageHeight = newMessage.clientHeight;
        const lastMessageHeight = lastMessage ? lastMessage.clientHeight : 0;

        if (messagesHeight + messagesScrollTop + newMessageHeight + lastMessageHeight >= messagesScrollHeight) {
            messages.scrollTop = messagesScrollHeight;
        }
    };

    render() {
        const messages = this.state.messages.map(message => {
            return (<Message
                            name={message.name || ''}
                            time={message.time}
                            text={message.text}
                            key={uniqid()} />)
        });
        return (
            <ol 
                className="chat__messages"
                id="msgs">
                {messages}
            </ol>
        )
    }
}
