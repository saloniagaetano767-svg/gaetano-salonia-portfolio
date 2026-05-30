export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(94,231,208,0.025) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(94,231,208,0.025) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, rgba(94,231,208,0.07) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-0 -right-[10%] w-[500px] h-[500px] rounded-full blur-[40px]"
        style={{
          background:
            "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
