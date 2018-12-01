import React from 'react';

const message = (props) => {

    return (
        <li className="chat__message">
            <div className="chat__message-title">
                <h4 className="heading-4">{props.name}</h4>
                <span className="span--dark">{props.time}</span>
            </div>
            <div className="chat__message-body">
                <p className="text">{props.text}</p>
            </div>
        </li>
    );
};

export default message;