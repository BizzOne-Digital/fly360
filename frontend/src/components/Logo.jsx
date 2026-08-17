export default function Logo({ size = 'md', className = '' }) {
  const sizes = { sm: 80, nav: 130, md: 110, lg: 140 };
  const w = sizes[size] || sizes.md;

  return (
    <div className={`logo-wing ${className}`} style={{ width: w }}>
      <img src="/logo.png" alt="FLYY 360" style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  );
}
