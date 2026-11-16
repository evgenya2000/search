interface BotAvatarProps {
  size?: number;
  className?: string;
}

export function BotAvatar({ size = 20, className }: BotAvatarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M168 99H88C74.7452 99 64 106.424 64 115.582V158.418C64 167.576 74.7452 175 88 175H168C181.255 175 192 167.576 192 158.418V115.582C192 106.424 181.255 99 168 99Z"
        fill="#F5F5F5"
        strokeWidth="10"
        stroke="#2F2F2F"
      />
      <path d="M155 130V147" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" stroke="#2F2F2F" />
      <path d="M101 130V147" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" stroke="#2F2F2F" />
      <path d="M63.0059 138.031L51 138" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" stroke="#2F2F2F" />
      <path d="M206.006 138.031L194 138" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" stroke="#2F2F2F" />
      <path
        d="M128 115C171.078 115 206 108.732 206 101C206 93.268 171.078 87 128 87C84.9218 87 50 93.268 50 101C50 108.732 84.9218 115 128 115Z"
        fill="#65764A"
        strokeWidth="5"
        stroke="#4F5C3A"
      />
      <path
        d="M79.5 99.5C79.5 64.8333 94.6667 49 128 49C161.333 49 176.5 64.8333 176.5 99.5H79.5Z"
        fill="#778D55"
        strokeWidth="5"
        strokeLinejoin="round"
        stroke="#4F5C3A"
      />
      <path
        d="M80 87C112 93.6667 144 93.6667 176 87L177.5 102C144.167 107.333 113.333 107.333 80 102V87Z"
        fill="#4F5C3A"
      />
      <path d="M96 69C105.333 62.3333 116 59 128 59" strokeWidth="4" strokeLinecap="round" stroke="#9FA98E" />
    </svg>
  );
}