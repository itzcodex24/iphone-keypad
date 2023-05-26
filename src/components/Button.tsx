import React from "react";

interface Props {
  number: number;
  onClick: (number: number) => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ number, onClick, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(number)}
      className="rounded-full h-14 w-14 flex justify-center items-center bg-opacity-70 font-bold text-2xl disabled:opacity-50 disabled:cursor-not-allowed text-primary bg-tertiary"
    >
      {number}
    </button>
  );
};

export default Button;
