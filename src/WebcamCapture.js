import React, {useRef, useCallback} from 'react'
import {useHistory} from "react-router-dom"
import {useDispatch} from 'react-redux'
import {setCameraImage} from "./features/cameraSlice"
import Webcam from "react-webcam"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"


const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
}

function WebcamCapture() {
    const webcamRef = useRef(null)
    const dispatch = useDispatch();
    const history = useHistory();
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc))
        history.push('/preview')
    }, [webcamRef, history])

    return (
        <div className = "webcamCapture">
        <Webcam 
        audio = {false}
        height={videoConstraints.height}
        ref = {webcamRef}
        screenshotFormat = "image/jpeg"
        width={videoConstraints.width}
        videoConstraints = {videoConstraints}
        />

        <RadioButtonUncheckedIcon className = "webcamCapture_icon" style = {{
            position: "absolute",
            bottom: "25%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            color: "whitesmoke"
        }} onClick = {capture} fontSize = "large"/>
        </div>
    )
}

export default WebcamCapture
