import React, {useEffect} from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Preview from './Preview'
import Chats from './Chats'
import ChatView from './ChatView'
import {useDispatch, useSelector} from 'react-redux'
import { selectUser, login, logout} from './features/appSlice'
import Login from './Login'
import {auth} from './firebase'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(login({
          displayName: user.displayName, id: user.id, profilePic: user.photoURL
        }))
      } else {

      }
    })
  }, [])
  return (

    <div className="app">
      <Router>
          {!user ? (
      <Login />
    ): (
      <div className = "app_body">
        <Switch>
          <Route exact path="/">
          <WebcamCapture />
          </Route>
          <Route path="/preview">
          <Preview />
          </Route>
          <Route path="/chats">
          <Chats />
          </Route>
          <Route path="/view">
            <ChatView/>
          </Route>
        </Switch>
      </div>
    )}
    </Router>
    </div>
  );
}

export default App;
