import React from "react";
import "./Background.css";

interface BackgroundProps {
  firstBoxColor?: string;
  secondBoxColor?: string;
  thirdBoxColor?: string;
  fourthBoxColor?: string;
}

const Background = (props: BackgroundProps) => {
  const { firstBoxColor, fourthBoxColor, secondBoxColor, thirdBoxColor } = props;
  return (
    <div className="mainContainer">
      <div className="boxContainer">
        <div className="colorBox first" style={{"--box-background-color": firstBoxColor} as React.CSSProperties}></div>
        <div className="colorBox second" style={{"--box-background-color": secondBoxColor} as React.CSSProperties}></div>
        <div className="colorBox third" style={{"--box-background-color": thirdBoxColor} as React.CSSProperties}></div>
        <div className="colorBox fourth" style={{"--box-background-color": fourthBoxColor} as React.CSSProperties}></div>
      </div>
    </div>
  )
}

export default Background;