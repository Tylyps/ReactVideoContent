import React from 'react';
import "./CustomButton.css";

interface CustomButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  borderColors?: {
    firstBorderColor?: string;
    secondBorderColor?: string;
  }
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    text,
    onClick,
    borderColors,
    disabled,
    ...restProps
  } = props;

  return (
    <button
      className="customButton"
      onClick={onClick}
      disabled={disabled}
      {...restProps as any}
    >
      <span
        className="buttonBackground"
        style={{
          "--first-border-color": borderColors?.firstBorderColor,
          "--second-border-color": borderColors?.secondBorderColor
        } as React.CSSProperties}
      ></span>
      <span
        className="buttonBackgroundGlow"
        style={{
          "--first-border-color": borderColors?.firstBorderColor,
          "--second-border-color": borderColors?.secondBorderColor,
        } as React.CSSProperties}
      ></span>
      <span className="contentContainer">
        {text}
      </span>
    </button>
  )
}

export default CustomButton;