import Link from "next/link";
import { Button } from "@/components/ui/button";
import ShoppingCartBtn from "./ShoppingCartBtn";
import { TDecodedUser } from "@/types";

interface ButtonProps {
  user: TDecodedUser | null;
  handleLogOut: () => void;
  auth: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
    logout: { title: string };
  };
}

export default function NavButton({ user, handleLogOut, auth }: ButtonProps) {
  if (user) {
    return (
      <div className="flex items-center justify-center gap-4">
        <div className="hidden lg:block">
          <ShoppingCartBtn />
        </div>
        <Button
          size="sm"
          onClick={handleLogOut}
          className="cursor-pointer bg-fh-coral"
        >
          {auth.logout.title}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2 lg:flex-row">
      <Button
        asChild
        variant="outline"
        className="rounded-lg font-medium text-fh-green-muted transition-colors hover:bg-black/5 hover:text-fh-green-deep"
      >
        <Link href={auth.login.url}>{auth.login.title}</Link>
      </Button>
      <Button asChild className="bg-fh-coral">
        <Link href={auth.signup.url}>Get started</Link>
      </Button>
    </div>
  );
}
