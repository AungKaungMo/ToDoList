import { useState, useEffect } from "react";

const DynamicClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
    </div>
  );
};

export default DynamicClock;
