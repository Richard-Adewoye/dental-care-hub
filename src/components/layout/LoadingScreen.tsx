import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2000);
    const removeTimer = setTimeout(() => onComplete(), 2600);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center dental-gradient transition-opacity duration-500 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      <div className="flex flex-col items-center gap-4 animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
            <path d="M12 2C9.5 2 7.5 3 7 5C6.5 7 5 8 4 10C3 12 3 14 4 16C5 18 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 19 18 20 16C21 14 21 12 20 10C19 8 17.5 7 17 5C16.5 3 14.5 2 12 2Z" fill="currentColor"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary-foreground tracking-tight">
          Exceptional Dental Care
        </h1>
        <div className="w-48 h-1 rounded-full bg-primary-foreground/20 overflow-hidden">
          <div className="h-full bg-primary-foreground rounded-full" style={{ animation: "loader-bar 2s ease-in-out" }} />
        </div>
      </div>
      <style>{`
        @keyframes loader-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
