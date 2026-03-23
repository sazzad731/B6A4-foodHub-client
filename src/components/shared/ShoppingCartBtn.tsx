import Link from 'next/link'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'

export default function ShoppingCartBtn({itemNumber}: {itemNumber: number}) {
  return (
    <Link href="/" className="cursor-pointer">
      <Button
        variant="ghost"
        className="relative size-10 p-0 hover:bg-fh-cream-mid"
      >
        <ShoppingCart className="size-5 text-fh-green-deep" strokeWidth={2.5} />
        {itemNumber !== 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-fh-coral rounded-full text-white text-[10px] flex items-center justify-center font-bold">
            {itemNumber}
          </span>
        )}
      </Button>
    </Link>
  );
}
