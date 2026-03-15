import Link from 'next/link';
import React from 'react'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className="text-lg font-semibold tracking-tighter">
        FoodHub
      </span>
    </Link>
  );
}
