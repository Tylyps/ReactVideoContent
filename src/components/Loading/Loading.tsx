import React, { memo, useMemo } from "react";
import "./Loading.css"
interface LoadingProps {
  text?: string;
  show?: boolean;
  dotsNumber?: number;
}

const Loading = (props: LoadingProps) => {
  const { show = true, text = "", dotsNumber = 8 } = props;

  const dotsArray = useMemo(() => Array(dotsNumber).fill(null), [dotsNumber]);

  if(!show) return null;
  const circleSize = Math.min(Math.max(text?.length, 4), 12);
  return (
    <div className="loadingContainer" style={{"--circle-size": circleSize} as React.CSSProperties}>
      <div className="dotsContainer" style={{"--dots-count": dotsArray.length} as React.CSSProperties}>
        {dotsArray.map((v, i) => (
          <div className="dot"style={{"--i": i} as React.CSSProperties} key={`loading-dots-${i}`}>
            <span></span>
            <span></span>
          </div>
        ))}
      </div>
      {text}
    </div>
  )
}

export default memo(Loading);