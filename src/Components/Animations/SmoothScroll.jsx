import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }) {
  const containerRef = useRef(null);
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const animationFrame = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Restore last scroll position
    const savedScroll = parseFloat(localStorage.getItem("scroll-pos") || "0");
    targetScroll.current = savedScroll;
    currentScroll.current = savedScroll;
    container.scrollTop = savedScroll;

    const handleWheel = (e) => {
      if (e.ctrlKey) return;

      if (e.target.closest(".native-scroll")) {
        return;
      }

      e.preventDefault();

      const maxScroll = container.scrollHeight - container.clientHeight;

      targetScroll.current += e.deltaY;
      if (targetScroll.current < 0) targetScroll.current = 0;
      if (targetScroll.current > maxScroll) targetScroll.current = maxScroll;
    };

    const animate = () => {
      currentScroll.current +=
        (targetScroll.current - currentScroll.current) * 0.1;

      container.scrollTo({
        top: currentScroll.current,
        behavior: "auto",
      });

      // Save position occasionally (every frame is fine for simplicity)
      localStorage.setItem("scroll-pos", currentScroll.current.toFixed(0));

      animationFrame.current = requestAnimationFrame(animate);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden">
      <div>{children}</div>
    </div>
  );
}
