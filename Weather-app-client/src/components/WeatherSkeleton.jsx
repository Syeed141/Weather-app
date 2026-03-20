export default function WeatherSkeleton() {
  return (
    <div className="glass-card skeleton-card">
      <div className="skeleton skeleton-line lg"></div>
      <div className="skeleton skeleton-line md"></div>
      <div className="skeleton skeleton-circle"></div>
      <div className="skeleton skeleton-line sm"></div>
      <div className="skeleton skeleton-grid">
        <div className="skeleton skeleton-box"></div>
        <div className="skeleton skeleton-box"></div>
        <div className="skeleton skeleton-box"></div>
        <div className="skeleton skeleton-box"></div>
      </div>
    </div>
  );
}