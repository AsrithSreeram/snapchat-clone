import React from 'react'
import {Button} from '@material-ui/core'
import './Login.css'
import {useDispatch, useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import {auth, provider} from './firebase'
import { login } from './features/appSlice'


function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const signIn = () => {
        auth.signInWithPopup(provider).then(({user}) => {
            console.log(user)
            dispatch(login({displayName: user.displayName, id: user.uid, profilePic: user.photoURL
            }))
        })
        .catch(error => alert(error.message))

        history.replace('/chats')
    }
    return (
        <div className = "login">
            <div className = "login_container">
                <img src = 'https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg' />
                <Button variant = "outlined" onClick = {signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
