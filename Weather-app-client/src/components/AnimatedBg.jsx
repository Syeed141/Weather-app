import { useMemo } from "react";

export default function AnimatedBg({ colors, type }) {
  const particles = useMemo(() => {
    const count = type === "sunny" ? 6 : type === "none" ? 0 : 24;

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
      duration:
        type === "rain"
          ? `${0.8 + Math.random() * 1.2}s`
          : `${3 + Math.random() * 3}s`,
    }));
  }, [type]);

  return (
    <div
      className="animated-bg"
      style={{
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      }}
    >
      <div className="bg-overlay"></div>

      {particles.map((p) => (
        <span
          key={p.id}
          className={`particle ${type}`}
          style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}