import ClockFace from '../images/ClockFace.png';
import ClockHand from '../images/ClockHand.png';

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";




function Timer() {
  const [key, setKey] = useState(0);

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      setKey(prevKey => prevKey + 1)
      return <div className="timer">Too lale...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining time </div>
        <div className="value">{remainingTime}</div>
        <div className="text">seconds</div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={key}
          isPlaying
          duration={180}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={() => [true, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>

  );
}


export default Timer;
