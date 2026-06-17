import { StationDecor, type StationTheme } from "./StationDecor";

interface StationBackdropProps {
  theme: StationTheme;
}

export function StationBackdrop({ theme }: StationBackdropProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
    >
      <div className={`journey-station-scrim journey-station-scrim--${theme}`} />
      <StationDecor theme={theme} />
    </div>
  );
}
