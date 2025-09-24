import { useRef, useState, useEffect } from "react";

export default function Reveal({
  children,
  direction = "up", // "up", "down", "left", "right", "fade"
  duration = 400,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target); // run once
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Map direction to translate classes
  const directions = {
    up: "translate-y-10",
    down: "-translate-y-10",
    left: "translate-x-10",
    right: "-translate-x-10",
    fade: "",
  };

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out transform
        ${
          visible
            ? "opacity-100 translate-x-0 translate-y-0"
            : `opacity-0 ${directions[direction]}`
        }
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
