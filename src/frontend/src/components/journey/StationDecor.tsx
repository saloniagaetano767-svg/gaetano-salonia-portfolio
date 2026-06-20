export type StationTheme = "sunset" | "surface" | "sea" | "deep" | "reef";

interface StationDecorProps {
  theme: StationTheme;
}

function SunsetDecor() {
  return (
    <>
      <div className="journey-deco journey-deco-sun" />
      <div className="journey-deco journey-deco-rays" />
      <svg
        className="journey-deco journey-deco-waves"
        viewBox="0 0 400 48"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0 28 Q50 18 100 28 T200 28 T300 28 T400 28 V48 H0 Z"
          fill="rgba(232,176,96,0.06)"
        />
        <path
          d="M0 34 Q60 24 120 34 T240 34 T360 34 T400 34 V48 H0 Z"
          fill="rgba(114,212,196,0.04)"
        />
      </svg>
    </>
  );
}

function SeaDecor() {
  return (
    <>
      <div className="journey-deco journey-deco-caustics" />
      {[
        { left: "8%", top: "22%", size: 6, delay: 0 },
        { left: "88%", top: "35%", size: 4, delay: 1.2 },
        { left: "72%", top: "68%", size: 5, delay: 0.6 },
        { left: "14%", top: "78%", size: 3, delay: 2 },
        { left: "48%", top: "12%", size: 4, delay: 1.8 },
      ].map((b, i) => (
        <span
          key={i}
          className="journey-deco-bubble"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
      <svg
        className="journey-deco journey-deco-seaweed journey-deco-seaweed--left"
        viewBox="0 0 40 120"
        aria-hidden
      >
        <path
          d="M20 120 C8 90 28 70 12 45 C22 65 18 25 20 0"
          fill="none"
          stroke="rgba(114,212,196,0.12)"
          strokeWidth="2"
        />
      </svg>
      <svg
        className="journey-deco journey-deco-seaweed journey-deco-seaweed--right"
        viewBox="0 0 40 120"
        aria-hidden
      >
        <path
          d="M20 120 C32 88 14 68 28 42 C16 62 22 22 20 0"
          fill="none"
          stroke="rgba(232,176,96,0.1)"
          strokeWidth="2"
        />
      </svg>
    </>
  );
}

function DeepDecor() {
  return (
    <>
      <div className="journey-deco journey-deco-depth-glow" />
      <div className="journey-deco journey-deco-current" />
      {[
        { left: "6%", top: "30%" },
        { left: "92%", top: "55%" },
        { left: "78%", top: "82%" },
        { left: "18%", top: "62%" },
      ].map((p, i) => (
        <span
          key={i}
          className="journey-deco-plankton"
          style={{ left: p.left, top: p.top, animationDelay: `${i * 0.7}s` }}
        />
      ))}
    </>
  );
}

function ReefDecor() {
  return (
    <>
      <div className="journey-deco journey-deco-reef-glow" />
      <svg
        className="journey-deco journey-deco-coral journey-deco-coral--left"
        viewBox="0 0 80 100"
        aria-hidden
      >
        <path
          d="M40 100 L20 60 Q10 40 25 25 Q35 45 40 20 Q45 45 55 25 Q70 40 60 60 Z"
          fill="rgba(232,176,96,0.08)"
        />
        <path
          d="M30 70 Q25 50 35 35 M50 70 Q55 48 45 32"
          fill="none"
          stroke="rgba(114,212,196,0.15)"
          strokeWidth="1.5"
        />
      </svg>
      <svg
        className="journey-deco journey-deco-coral journey-deco-coral--right"
        viewBox="0 0 80 100"
        aria-hidden
      >
        <path
          d="M40 100 L15 55 Q5 35 22 18 Q32 38 40 12 Q48 38 58 18 Q75 35 65 55 Z"
          fill="rgba(114,212,196,0.07)"
        />
      </svg>
      {[
        { left: "22%", top: "18%" },
        { left: "68%", top: "28%" },
        { left: "85%", top: "72%" },
        { left: "12%", top: "85%" },
        { left: "50%", top: "8%" },
      ].map((p, i) => (
        <span
          key={i}
          className="journey-deco-bio"
          style={{ left: p.left, top: p.top, animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </>
  );
}

export function StationDecor({ theme }: StationDecorProps) {
  if (theme === "sunset" || theme === "surface") return <SunsetDecor />;
  if (theme === "sea") return <SeaDecor />;
  if (theme === "deep") return <DeepDecor />;
  return <ReefDecor />;
}

export const SECTION_THEMES: Record<string, StationTheme> = {
  intro: "sunset",
  about: "sea",
  gallery: "surface",
  skills: "sea",
  milestones: "deep",
  contact: "reef",
};
