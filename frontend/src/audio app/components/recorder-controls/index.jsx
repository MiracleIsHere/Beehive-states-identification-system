import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faArrowsSpin } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

export default function RecorderControls({ loadingState, recorderState, handlers }) {
  const { isLoading } = loadingState;
  const { initRecording } = recorderState;
  const { startRecording } = handlers;

  return (
    <div className="controls-container">
      <div className="start-button-container">
        {initRecording ? (
          <button className="load-button" title="Recording" disabled={isLoading}>
            <FontAwesomeIcon icon={isLoading ? faArrowsSpin : faMicrophone} className={isLoading ? "spinner" : ''} size="6x" />
          </button>

        ) : (
          <button className="start-button" title="Start Recording" onClick={startRecording} disabled={isLoading}>
            <FontAwesomeIcon icon={isLoading ? faArrowsSpin : faMicrophone} className={isLoading ? "spinner" : ''} size="6x" />
          </button>
        )}
      </div>
    </div>
  );
}
