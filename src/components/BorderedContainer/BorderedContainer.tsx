import React, { ReactElement } from 'react';
import "./BorderedContainer.css";

export interface BorderedContainerProps {
  children?: JSX.Element | ReactElement;
  leftBorderColor?: string;
  rightBorderColor?: string;
}

const BorderedContainer = (props: BorderedContainerProps) => {
  const {children, leftBorderColor, rightBorderColor} = props;
  return (
    <div
      className="customBorder"
      style={{
        "--left-border-color": leftBorderColor,
        "--right-border-color": rightBorderColor,
      } as React.CSSProperties}
    >
      <span className="border"></span>
      <span className="borderGlow"></span>
      <div className="contentContainer">
        {children}
      </div>
    </div>
    )
}

export default BorderedContainer;