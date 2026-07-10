export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="18" cy="30" rx="9" ry="13" fill="#1E5FA8" />
      <ellipse cx="30" cy="24" rx="7.5" ry="11" fill="#0B2A4A" />
      <circle cx="13" cy="12" r="3" fill="#1E5FA8" />
      <circle cx="19" cy="8" r="2.6" fill="#1E5FA8" />
      <circle cx="25" cy="7" r="2.3" fill="#0B2A4A" />
      <circle cx="30.5" cy="8.5" r="2" fill="#0B2A4A" />
    </svg>
  );
}
