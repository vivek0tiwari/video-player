
import { createRef, useEffect, useRef, useState } from "react";
import { useRecorder } from "../recordersHooks/useRecorder";

 export const Recorder = () => {
    const videoRef = createRef<HTMLVideoElement>()
    const videoRecordedRef = createRef<HTMLVideoElement>()
    const { stream, recordingStatus, recordedVideo, stopVideoRecording, startVideoRecording } = useRecorder({isAudio:true, isVideo:true, videoRef, videoRecordedRef})
    const [loadingPreview, setLoadingPreview] = useState<boolean>(true)
    
    const startRecording = ()=>{
        // console.log(stream, videoRef)
    }
    const stopRecording = ()=>{
        console.log(stream, videoRef)
    }
    const resumeRecording = ()=>{
        console.log(stream, videoRef)
    }
    const pauseRecording = ()=>{
        console.log(stream, videoRef)
    }
    return (
        <div className="main-container">
            {/* {audioPermission && audioPermission ?
            <button onClick={startRecording}>Start Recording</button>
            :null} */}
            
            {<video className="video-preview" id="video-local" ref={videoRef}></video>}
            {recordingStatus === "inactive" ? (
						<button onClick={startVideoRecording} type="button">
							Start Recording
						</button>
					) : null}
					{recordingStatus === "recording" ? (
						<button onClick={stopVideoRecording} type="button">
							Stop Recording
						</button>
					) : null}
            {
                recordedVideo ?
                <div className="recorded-video-preview-container video-preview">
                <video autoPlay controls className="video-preview" id="video-recorded" ref={videoRecordedRef} src={recordedVideo}></video>
                <a download href={recordedVideo} className="App-link">
							Download Recording
				</a>
                </div>
                :null
                }
        </div>
    );
};
