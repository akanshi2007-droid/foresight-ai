export default function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M24 3 L44 12 V24 C44 35 36 42.5 24 45 C12 42.5 4 35 4 24 V12 Z" fill="#182a3b" stroke="#f2a93b" strokeWidth="2" />
      <path d="M14 26 L20 26 L23 19 L27 33 L30 26 L34 26" stroke="#35c3b6" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="34" cy="26" r="2.4" fill="#f2a93b" />
    </svg>
  );
}
