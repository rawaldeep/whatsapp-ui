import React, {useState, useEffect} from 'react';
import '../styles/Sidebar.css';
import  {Avatar, IconButton } from "@material-ui/core";
import { DonutLarge, Chat, MoreVert, SearchOutlined, Unsubscribe } from "@material-ui/icons";
import SidebarChat from "./SidebarChat"
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    useEffect(()=>{
        db.collection('rooms').onSnapshot((snapshot)=>(
            setRooms(snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            })))
        ));
        return ()=>{
            Unsubscribe();
        }
    },[]);
    return (
        <div className="sidebar">
           <div className="sidebar__header">
           <Avatar src={user?.photoURL} />
           <div className="sidebar__headerRight">
           <IconButton><DonutLarge /></IconButton>
           <IconButton><Chat /></IconButton>   
           <IconButton><MoreVert /></IconButton>
           </div>
           </div>
           <div className="sidebar__search">
           <div className="sidebar__searchContainer">
               <SearchOutlined/>
               <input placeholder="search or start new chat" type="text" />
               </div>
           </div>
           <div className="sidebar__chats">
               <SidebarChat addNewChat/>
            {rooms.map(room=>(
                <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
            ))}
           </div>
        </div>
    )
}

export default Sidebar

