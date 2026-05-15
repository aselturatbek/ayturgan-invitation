import { useEffect, useState } from "react";

const eventDate = new Date("2026-06-16T17:00:00");

function getTimeLeft() {
  const now = new Date();
  const difference = eventDate - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdownSection">
      <h2 className="countdownTitle">Калган убакыт:</h2>

      <div className="countdownGrid">
        <div className="countdownItem">
          <strong>{timeLeft.days}</strong>
          <span>КҮН</span>
        </div>

        <div className="countdownDivider">:</div>

        <div className="countdownItem">
          <strong>{timeLeft.hours}</strong>
          <span>СААТ</span>
        </div>

        <div className="countdownDivider">:</div>

        <div className="countdownItem">
          <strong>{timeLeft.minutes}</strong>
          <span>МҮНӨТ</span>
        </div>

        <div className="countdownDivider">:</div>

        <div className="countdownItem">
          <strong>{timeLeft.seconds}</strong>
          <span>СЕКУНД</span>
        </div>
      </div>
    </section>
  );
}

export default Countdown;