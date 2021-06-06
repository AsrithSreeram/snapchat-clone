import React from 'react'
import './Chat.css'
import {Avatar} from '@material-ui/core'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import ReactTimeago from 'react-timeago'
import {selectImage} from './features/appSlice'
import {useDispatch} from "react-redux"
import {db} from './firebase'
import { useHistory } from 'react-router'
import {selectUser} from './features/appSlice'
import {useSelector} from 'react-redux'


function Chat({id, username, timestamp, read, imageUrl, profilePic}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUser);


    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl))
            db.collection('posts').doc(id).set(
            {
                read: true,
            }, 
            {merge: true}
            )
            history.push("/view")
        }
    }
    return (
        <div onClick = {open} className = "chat">
            <Avatar className = "chat_avatar" src = {profilePic} />
            <div className = "chat_info">
                <h4>{username}</h4>
                <p>{!read && "Tap to view -"}{read && "Received - "} <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()}/></p>
            </div>

            {!read && <StopRoundedIcon className = "chat_readIcon" />}
        </div>
    )
}

export default Chat
