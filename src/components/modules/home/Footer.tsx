import Logo from "@/components/shared/Logo";
import { Facebook, Twitter } from "lucide-react";
import Link from "next/link";

const LINKS = {
  Explore: [
    ["Browse Meals", "/meals"],
    ["Restaurants", "/providers"],
    ["Popular Dishes", "/meals?tag=popular"],
    ["Vegan Options", "/meals?vegan=true"],
  ],
  Account: [
    ["Sign In", "/auth/login"],
    ["Register", "/auth/register"],
    ["My Orders", "/customer/orders"],
    ["Profile", "/customer/profile"],
    ["Become a Provider", "/auth/register?role=provider"],
  ],
  Company: [
    ["About Us", "/about"],
    ["Contact", "/contact"],
    ["Privacy Policy", "/privacy"],
    ["Terms of Service", "/terms"],
    ["Admin", "/admin"],
  ],
};

export default function Footer() {
  return (
    <footer className="text-white/60 bg-fh-green-deep">
      <div className="container mx-auto px-4 sm:px-0 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="justify-self-start">
            <Logo foodColor="text-white" />
            <p className="text-sm leading-relaxed font-light my-5">
              Discover and order delicious meals from the best local
              restaurants. Fast delivery, real-time tracking — all in one place.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Facebook, url: "https://www.facebook.com" },
                { icon: Twitter, url: "https://www.twitter.com" },
              ].map((Icon, i) => (
                <a
                  key={i}
                  href={Icon.url}
                  className="w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center text-xs font-semibold hover:bg-white/10 hover:text-white transition-colors"
                  target="_blank"
                >
                  <Icon.icon />
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {Object.entries(LINKS).map(([col, items]) => (
            <div key={col}>
              <p className="text-[11px] font-bold tracking-[1.5px] uppercase text-white/35 mb-4">
                {col}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm font-light hover:text-white transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 flex items-center justify-center gap-3 text-xs text-white/30">
          <span>
            © 2025 FoodHub. All rights reserved. Made with ❤️ in Chattogram.
          </span>
        </div>
      </div>
    </footer>
  );
}
