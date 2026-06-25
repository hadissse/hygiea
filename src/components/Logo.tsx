import React from 'react';
import Image from 'next/image';

interface LogoProps {
  height?: number;
  color?: string;
  className?: string;
}

export function Logo({ height = 28, className }: LogoProps) {
  const width = Math.round(height * 3.2);

  return (
    <Image
      src="/hygiea-logo.png"
      alt="Hygiea"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain', flexShrink: 0 }}
      priority
    />
  );
}
