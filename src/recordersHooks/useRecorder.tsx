import { useState, useRef, Ref, useEffect, RefObject } from "react";
interface RecorderReturnTypes {
    stream: MediaStream|null
    startVideoRecording: ()=>void
    recordedVideo:string|undefined
    recordingStatus: string|undefined
    stopVideoRecording:()=>void
}
interface RecorderInputProps{
    isAudio: boolean
    isVideo: boolean
    videoRef: RefObject<HTMLVideoElement>
    videoRecordedRef: RefObject<HTMLVideoElement>
}
export function useRecorder(prop: RecorderInputProps): RecorderReturnTypes {
    const {videoRef} = prop
    const [stream, setStream] = useState<MediaStream | null>(null);
    const mediaRecorder = useRef<MediaRecorder>();
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [audio, setAudio] = useState(null);
    const [recordedVideo, setRecordedVideo] = useState<string>();

	const [videoChunks, setVideoChunks] = useState<Blob[]>([]);

    const openWebCam = async (stream:any)=>{
        
        if (videoRef && videoRef.current) {
            videoRef.current.srcObject = await stream;
            setStream(stream)
            var playPromise = videoRef.current.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    
                })
                .catch(error => {
                    videoRef.current?.pause();
                });
            }
            videoRef.current.play()
            videoRef.current.addEventListener('loadedmetadata',()=>{
                videoRef.current && videoRef.current.play()
            })
        } 
    }
    const startVideoRecording = async () => {
        if(!stream){
            return
        }
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { mimeType: 'video/webm' });
        mediaRecorder.current = media;
        mediaRecorder.current && mediaRecorder.current.start();
        let localVideoChunks:Blob[] = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localVideoChunks.push(event.data);
        };
        setVideoChunks(localVideoChunks);
      };

    const stopVideoRecording = () => {
        if(!stream || !mediaRecorder || !mediaRecorder.current){
            return
        }
		setRecordingStatus("inactive");
		mediaRecorder.current.stop();

		mediaRecorder.current.onstop = () => {
			const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
			const videoUrl = URL.createObjectURL(videoBlob);

			setRecordedVideo(videoUrl);

			setVideoChunks([]);
		};
	};
    
    useEffect(()=>{
        const _getPermission = async () => {
            if ("MediaRecorder" in window) {
                try {
                    const streamData = await navigator.mediaDevices.getUserMedia({
                        audio: true,
                        video: true,
                    });
                    openWebCam(streamData)
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert("The MediaRecorder API is not supported in your browser.");
            }
        };
        _getPermission()
        videoRef && videoRef.current && videoRef.current.addEventListener('onloadedmetadata', ()=>{
            videoRef.current && videoRef.current.play && videoRef.current.play();
        })
    },[])


    return {
        stream,
        startVideoRecording,
        recordedVideo,
        recordingStatus,
        stopVideoRecording
    };
}

