import React, { useEffect } from "react";

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = React.useState("");
  useEffect(() => {
    setTimeout(() => {
      setDebounceValue(value);
    }, ms);
  }, [value, ms]);

  return debounceValue;
};

export default useDebounce;
