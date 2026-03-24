"use client";

import { Menu } from "lucide-react";


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, userLogOut } from "@/services/auth";
import { ModeToggle } from "./ModeToggle";
import { toast } from "sonner";
import Logo from "./Logo";
import NavButton from "./NavButton";
import ShoppingCartBtn from "./ShoppingCartBtn";



interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  className?: string;
  logo?: {
    src?: string;
    alt?: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
    logout: {
      title: string;
    };
  };
}

const Navbar = ({
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
    logout: { title: "Logout" },
  },
  className,
}: NavbarProps) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // load user data
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userdata = await getUser();
        setUser(userdata);
      } catch (error) {
        console.error("Failed to get user:", error);
      }
    };
    getCurrentUser();
  }, [loading]);


  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);


  const handleLogOut = () => {
    userLogOut();
    toast.success("Log out success")
    setLoading(!loading);
  };

  const menu = [
    { title: "Home", url: "/" },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    }
  ]

  if(user){
    menu.push({
      title: "Dashboard",
      url: "/dashboard"
    })
  }

  return (
    <section
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""} py-4 bg-fh-cream/88 backdrop-blur-lg border-b border-b-fh-green-deep/7`}
    >
      <div className="container mx-auto px-4 xl:px-0">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Logo */}
          <Logo />
          <div className="flex items-center justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex gap-2">
            <NavButton user={user} handleLogOut={handleLogOut} auth={auth} />
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />
            <div>
              <span className="mr-2">
                <ShoppingCartBtn/>
              </span>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link href="/" className="flex items-center gap-2"></Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex items-center w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>
                    <NavButton
                      user={user}
                      handleLogOut={handleLogOut}
                      auth={auth}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="block px-3.5 py-2 text-sm font-medium text-fh-green-muted rounded-lg hover:text-fh-green-deep hover:bg-black/5 transition-colors"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link
      key={item.title}
      href={item.url}
      className="block px-3.5 py-2 text-sm font-medium text-fh-green-muted rounded-lg hover:text-fh-green-deep hover:bg-black/5 transition-colors"
    >
      {item.title}
    </Link>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar };
