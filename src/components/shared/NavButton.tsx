import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import ShoppingCartBtn from "./ShoppingCartBtn";

interface ButtonProps {
  user: any;
  handleLogOut: () => void;
  auth: any;
}

export default function NavButton({ user, handleLogOut, auth }: ButtonProps) {
  if (user) {
    return (
      <div className="flex items-center justify-center gap-4">
        <div className="hidden lg:block">
          <ShoppingCartBtn itemNumber={0} />
        </div>
        <Button size="sm" onClick={handleLogOut}>
          {auth.logout.title}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col items-center gap-2">
      <Button asChild variant="outline" className="font-medium text-fh-green-muted rounded-lg hover:text-fh-green-deep hover:bg-black/5 transition-colors">
        <Link href={auth.login.url}>{auth.login.title}</Link>
      </Button>
      <Button asChild className="bg-fh-coral">
        <Link href={auth.signup.url}>Get started</Link>
      </Button>
    </div>
  );
};