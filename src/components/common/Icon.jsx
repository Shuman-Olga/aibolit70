const paths = {
  search: (
    <>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </>
  ),

  list: (
    <>
      <path d="M3 4h10M3 8h10M3 12h10" />
    </>
  ),

  telephone: (
    <path d="M4.5 2.5 6.7 2l1.4 3.3-1.8 1.4c.8 1.7 2.2 3.1 3.9 3.9l1.4-1.8L15 10.2l-.5 2.2c-.2.8-.9 1.4-1.7 1.4C7.4 13.8 2.2 8.6 2.2 3.2c0-.8.6-1.5 1.4-1.7Z" />
  ),

  download: (
    <>
      <path d="M8 2v8" />
      <path d="m5 7 3 3 3-3" />
      <path d="M3 12v2h10v-2" />
    </>
  ),
};

export default function Icon({ name, size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false">
      {paths[name]}
    </svg>
  );
}
