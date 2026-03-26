export default function AIInsights({
  aiSummary,
  aiActivity,
  aiOutfit,
  aiLoading,
  activityLoading,
  outfitLoading,
  onAskActivity,
  onAskOutfit,
  weather,
}) {
  if (!weather) return null;

  return (
    <div className="ai-wrap">
      <div className="glass-card ai-card">
        <div className="ai-card-head">
          <h2 className="section-title">AI Weather Summary</h2>
        </div>

        <div className="ai-content">
          {aiLoading ? "Generating summary..." : aiSummary || "No summary yet."}
        </div>
      </div>

      <div className="ai-actions">
        <button
          className="ai-action-btn"
          onClick={onAskActivity}
          disabled={activityLoading}
        >
          {activityLoading ? "Thinking..." : "What should I do today?"}
        </button>

        <button
          className="ai-action-btn"
          onClick={onAskOutfit}
          disabled={outfitLoading}
        >
          {outfitLoading ? "Thinking..." : "AI outfit suggestion"}
        </button>
      </div>

      {aiActivity && (
        <div className="glass-card ai-card">
          <h2 className="section-title">What should I do today?</h2>

          <div className="ai-list">
            <div>🌳 {aiActivity.outdoor}</div>
            <div>🚗 {aiActivity.travel}</div>
            <div>💧 {aiActivity.health}</div>
          </div>
        </div>
      )}

      {aiOutfit && (
        <div className="glass-card ai-card">
          <h2 className="section-title">AI Outfit Suggestion</h2>

          <div className="ai-list">
            <div>👕 {aiOutfit.top}</div>
            <div>👖 {aiOutfit.bottom}</div>
            <div>👟 {aiOutfit.footwear}</div>
            <div>🎒 {aiOutfit.extra}</div>
          </div>
        </div>
      )}
    </div>
  );
}
