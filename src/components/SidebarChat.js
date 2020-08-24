import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import '../styles/sidebarChat.css';
import db from '../firebase';

function SidebarChat({id, name, addNewChat}) {
    const [seed, setSeed] = useState('');

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000));
    },[]);

    const createChat = () => {
        const roomName = prompt("please enter name for chat room");
        if(roomName){
            db.collection('rooms').add({
                name: roomName,
            })
            // do some clever db stuff
        }
    }

    return !addNewChat ? (
        <div className="sidebarChat"> 
            <Avatar src= {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat__info">
            <h2>{name}</h2>
                <p>Last message...</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
