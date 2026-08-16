export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-spinner" />
      <style>{`
        .loading-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
        }
        .loading-spinner {
          width: 48px;
          height: 48px;
          border: 3px solid var(--border-glow);
          border-top-color: var(--accent-blue);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
