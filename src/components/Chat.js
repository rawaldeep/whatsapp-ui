import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import '../styles/Chat.css';
import db from '../firebase';
import firebase from "firebase";
import {useStateValue} from '../StateProvider';



function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId)
            .onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name)
            })

            db.collection('rooms').doc(roomId).collection("messages")
            .orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map( doc=> doc.data()))
            ))
        }
    },[roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed >>>',input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }
    return (
        <div className="chat">
          <div className="chat__header">
          <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className='chat__headerInfo'>
              <h3>{roomName}</h3>
              <p>Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
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
          {messages.map(message=>(
            <p className={`chat__message ${ message.name === user.displayName && 'chat__reciever'}`}>
              <span className='chat__name'>{message.name}</span>
              {message.message}
              <span className='chat__timestamp'>
                  {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
              </p>
          ))}
             
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
