import React, { useEffect } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = React.useState("");
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, ms);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;
