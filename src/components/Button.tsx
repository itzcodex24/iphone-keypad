import { motion } from "framer-motion";
import React from "react";

interface Props {
  number: number;
  onClick: (number: number) => void;
  disabled?: boolean;
  index: number;
}

const Button: React.FC<Props> = ({
  number,
  onClick,
  disabled = false,
  index,
}) => {
  return (
    <motion.button
      variants={{
        initial: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: index * 0.1,
          },
        },
      }}
      initial="initial"
      animate="visible"
      disabled={disabled}
      onClick={() => onClick(number)}
      className="rounded-full h-14 w-14 flex justify-center items-center bg-opacity-70 font-bold text-2xl disabled:opacity-50 disabled:cursor-not-allowed text-primary bg-tertiary outline-none"
    >
      {number}
    </motion.button>
  );
};

export default Button;
