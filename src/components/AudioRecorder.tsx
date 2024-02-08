interface AudioRecorderButtonProps {
    getPermission:()=>void
    permission: boolean
}
export const AudioRecorder = (props:AudioRecorderButtonProps) => {
    const {getPermission, permission} = props
    return (
        <div>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                        <button onClick={getPermission} type="button">
                            Get Microphone
                        </button>
                    ): null}
                </div>
            </main>
        </div>
    );
};
