import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router'
import {selectCamera} from './features/cameraSlice'
import CloseIcon from '@material-ui/icons/Close'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import CreateIcon from '@material-ui/icons/Create'
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import {v4 as uuid} from "uuid"
import {storage, db} from './firebase'
import firebase from 'firebase'
import './Preview.css'
import {resetCameraImage} from './features/cameraSlice'
import {selectUser} from './features/appSlice'
import Login from './Login'

function Preview() {
    const cameraImage = useSelector(selectCamera)
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector(selectUser)


    useEffect(() => {
        if (cameraImage == null) {
            history.replace("/")
        }
    }, [cameraImage, history])

    const closePreview = () => {
        dispatch(resetCameraImage())
    }

    const sendPost = () => {
        const id = uuid();
        const uploadPicture = storage.ref(`posts/${id}`).putString(cameraImage, 'data_url')
        uploadPicture.on('state_changed', null, 
        (error) => {
            console.log(error)
        },
        () => {
            storage.ref('posts').child(id).getDownloadURL()
            .then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: 'Snapchat Users',
                    read: false,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),

                })
                history.replace("/chats")
            })
        }
        );
        
    }

    return (
        <div className = "preview">
            <CloseIcon className = "preview_close" onClick = {closePreview} style = {{
                position: "absolute",
                top: "0",
                margin: "5px",
                fontSize: "18px",
                cursor: "pointer",
                color: "white"
            }}/>
            <div className = "preview_toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon  />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src = {cameraImage} alt = "" />
            <div onClick = {sendPost} className = "preview_footer">
                <p style = {{fontSize: "9px", fontWeight: "bold"}}>Send To</p>
                <SendIcon className = "preview_sendIcon"/>
            </div>
        </div>
    )
}

export default Preview
