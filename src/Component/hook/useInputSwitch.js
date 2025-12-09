import { useRef } from "react";

export default function useInputSwitch(totalInputs) {
  const refs = useRef([]);


  const Enter = (index) => (el) => {
    refs.current[index] = el;
  };

  // Enter key handle
  const handleEnter = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      const nextIndex = index + 1;
      if (refs.current[nextIndex]) {
        refs.current[nextIndex].focus(); 
      }
    }
  };

  return { Enter, handleEnter };
}
