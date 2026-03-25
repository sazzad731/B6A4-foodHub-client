import Link from 'next/link';
import React from 'react'

export default function Logo({foodColor = "text-fh-green-deep"}: {foodColor?: string}) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-[10px] bg-fh-coral flex items-center justify-center text-lg text-white font-bold">
        🍱
      </div>
      <span className={`font-display text-2xl font-bold tracking-tight ${foodColor}`}>
        Food<span className="text-fh-coral">Hub</span>
      </span>
    </Link>
  );
}
