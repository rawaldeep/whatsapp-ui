import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';

function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed >>>',input);
        setInput("");
    }
    return (
        <div className="chat">
          <div className="chat__header">
          <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='chat__headerInfo'>
              <h3>Room name</h3>
              <p>Last seen at ...</p>
              </div>
              <div className='chat__headerRight'>
                  <IconButton>
                      <SearchOutlined />
                  </IconButton>
                  <IconButton>
                      <AttachFile />
                  </IconButton>
                  <IconButton>
                      <MoreVert />
                  </IconButton>
              </div>
          </div>
          <div className='chat__body'>
              <p className={`chat__message ${ true && 'chat__reciever'}`}>
              <span className='chat__name'>rawaldeep singh</span>
              Hey Guys
              <span className='chat__timestamp'>3:15 a.m</span>
              </p>
          </div>
          <div className='chat__footer'>
              <InsertEmoticon />
              <form>
                  <input onChange={e=>setInput(e.target.value)} placeholder='Type a message' type='text' value={input} />
                  <button type='submit' onClick={sendMessage}>Send a message</button>
              </form>
              <Mic />
          </div>
        </div>
    )
}

export default Chat
