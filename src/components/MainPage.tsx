import { Spinner } from "@chakra-ui/react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import MotionPage from "./MotionPage";
const passcode = "1234";

function MainPage() {
  const [tries, setTries] = useState<number>(0);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const animate = useAnimation();

  const handleKeydown = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case "0":
        setNumbers((prev) => [...prev, 0]);
        break;
      case "1":
        setNumbers((prev) => [...prev, 1]);
        break;
      case "2":
        setNumbers((prev) => [...prev, 2]);
        break;
      case "3":
        setNumbers((prev) => [...prev, 3]);
        break;
      case "4":
        setNumbers((prev) => [...prev, 4]);
        break;
      case "5":
        setNumbers((prev) => [...prev, 5]);
        break;
      case "6":
        setNumbers((prev) => [...prev, 6]);
        break;
      case "7":
        setNumbers((prev) => [...prev, 7]);
        break;
      case "8":
        setNumbers((prev) => [...prev, 8]);
        break;
      case "9":
        setNumbers((prev) => [...prev, 9]);
        break;

      case "Backspace":
        setNumbers((prev) => prev.slice(0, prev.length - 1));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  useEffect(() => {
    const isTimeout = localStorage.getItem("timeout");
    if (isTimeout) {
      if (new Date() > new Date(isTimeout)) {
        localStorage.removeItem("timeout");
      } else {
        setError("You have exceeded the maximum number of tries");
      }
    }
  }, []);

  useEffect(() => {
    if (tries === 3) {
      setError("You have exceeded the maximum number of tries");
      localStorage.setItem(
        "timeout",
        new Date(new Date().getTime() + 30 * 1000).toString()
      );
    }
  }, [tries]);

  useEffect(() => {
    if (numbers.length === passcode.length) {
      if (numbers.join("") === passcode) {
        localStorage.setItem("bypass", "true");
        setLoading(true);
        setTimeout(() => {
          navigate("/main");
        }, 1000);
      } else {
        animate.start("shake");
        setTries((prev) => prev + 1);
        setNumbers([]);
      }
    }
  }, [numbers]);

  const handleAddNum = (num: number) => {
    setNumbers([...numbers, num]);
  };
  return (
    <>
      <MotionPage className="w-full h-screen flex flex-col bg-secondary">
        <div className="flex w-full justify-center items-center py-4 text-primary">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <div className="flex-grow flex justify-center items-center flex-col ">
          <div className="flex justify-center items-center flex-col ">
            <h1 className="text-2xl text-primary">Enter Passcode</h1>
            <motion.div
              className="rounded flex justify-between items-center h-10 w-32"
              animate={animate}
              variants={{
                shake: {
                  x: [-20, 20, -20, 20, 0],
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
            >
              {passcode.split("").map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 p-1 rounded-full border-primary border-2 transition-colors duration-600 ease-in-out ${
                    numbers[index] && "bg-primary"
                  }`}
                ></div>
              ))}
            </motion.div>
          </div>
          <div className="relative">
            {loading && (
              <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]">
                <Spinner className="text-primary" size={"xl"} thickness="5px" />
              </div>
            )}

            <div
              className={`relative w-56 h-96 transition-all duration-800 ease-in-out flex flex-col items-center justify-center gap-y-6 ${
                loading && "blur-md"
              }`}
            >
              <div
                className={`relative w-full justify-between items-center flex `}
              >
                {[1, 2, 3].map((num, i) => (
                  <Button
                    key={i}
                    number={num}
                    disabled={typeof error == "string"}
                    onClick={(num) => handleAddNum(num)}
                  />
                ))}
              </div>
              <div className="w-full justify-between items-center flex">
                {[4, 5, 6].map((num, i) => (
                  <Button
                    key={i}
                    number={num}
                    disabled={typeof error == "string"}
                    onClick={(num) => handleAddNum(num)}
                  />
                ))}
              </div>
              <div className="w-full justify-between items-center flex">
                {[7, 8, 9].map((num, i) => (
                  <Button
                    key={i}
                    number={num}
                    disabled={typeof error == "string"}
                    onClick={(num) => handleAddNum(num)}
                  />
                ))}
              </div>
              <div className="w-full flex justify-center items-center">
                <Button
                  number={0}
                  onClick={(num) => handleAddNum(num)}
                  disabled={typeof error == "string"}
                />
              </div>
            </div>
          </div>
          {typeof error == "string" && (
            <p className="text-center text-red-400 font-semibold text-2xl">
              {error}
            </p>
          )}
        </div>
      </MotionPage>
    </>
  );
}

export default MainPage;
