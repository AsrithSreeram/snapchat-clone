 import React, {useState, useEffect} from 'react'
 import {Avatar} from '@material-ui/core'
 import SearchIcon from '@material-ui/icons/Search'
 import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
 import './Chats.css'
 import { db } from './firebase'
 import Chat from './Chat'
 import {selectUser} from './features/appSlice'
 import {auth} from './firebase'
 import {useSelector, useDispatch} from 'react-redux'
 import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
 import {useHistory} from 'react-router-dom'
 import {resetCameraImage} from './features/cameraSlice'

 
 function Chats() {
     const [posts, setPosts] = useState([]);
     const user = useSelector(selectUser);
     const history = useHistory();
     const dispatch = useDispatch()

     const takeSnap = () => {
        dispatch(resetCameraImage())
         history.push('/')
     }

     useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => setPosts(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
        }))))
     }, [])
     return (
         <div className = "chats">
             <div className = "chats_header">
                 <Avatar src = {user?.profilePic} onClick={() => auth.signOut()} className = "chats_avatar" />
                 <div className = "chats_search">
                    <SearchIcon style = {{color: "white" }}/>
                    <input placeholder = "Friends" type="text" />
                </div>
                <div className = "chats_chatIcon">
                     <ChatBubbleIcon style = {{color: "white" }} />
                </div>
             </div>
             <div className = "chat_posts">
                    {posts.map(({id, data: {profilePic, username, timestamp, imageUrl, read}}) => (
                        <Chat 
                            key={id}
                            id={id}
                            username = {username}
                            timestamp = {timestamp}
                            imageUrl = {imageUrl}
                            read = {read}
                            profilePic = {profilePic}
                            />
                    ))}
                </div>
                <RadioButtonUncheckedIcon className = "chats_takePic" onClick = {takeSnap} fontSize="large" />
         </div>
     )
 }
 
 export default Chats
 