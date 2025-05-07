import React from "react";

const Button = ({
  iconPrefix,
  iconPostfix,
  text,
  onClick,
  className = "",
  type = "button",
  hasBackground = false,
  hasBorder = false,
  bgColor = "#4D44B5",
  borderColor = "#4D44B5",
}) => {
  const buttonStyles = `
    flex justify-center items-center gap-2 w-full rounded-full px-6 py-2 h-[46px] font-bold
    ${hasBackground ? `bg-[${bgColor}] text-white` : ""}
    ${hasBorder ? `border-2 border-[${borderColor}] text-[${borderColor}]` : ""}
    ${className}
  `;

  return (
    <button className={buttonStyles} onClick={onClick} type={type}>
      {iconPrefix && <span className="text-[16px]">{iconPrefix}</span>}
      {text}
      {iconPostfix && <span className="text-[16px]">{iconPostfix}</span>}
    </button>
  );
};

export default Button;
