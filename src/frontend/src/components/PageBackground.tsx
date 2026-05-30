export function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 page-bg-grid transition-[background-image] duration-500"
        style={{
          backgroundImage: "var(--grid-lines), var(--grid-dots)",
          backgroundSize: "60px 60px, 20px 20px",
        }}
      />
      <div
        className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[40px] transition-[background] duration-500"
        style={{
          background: `radial-gradient(circle, var(--orb-primary) 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-0 -right-[10%] w-[500px] h-[500px] rounded-full blur-[40px] transition-[background] duration-500"
        style={{
          background: `radial-gradient(circle, var(--orb-accent) 0%, transparent 65%)`,
        }}
      />
      <div
        className="page-bg-orb-extra absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[60px]"
        style={{
          background: `radial-gradient(circle, var(--orb-extra) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
