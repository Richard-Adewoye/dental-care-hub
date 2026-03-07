import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Menu, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Why Choose Us", href: "#why-choose-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (!isHome) return;
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-dental-dark text-primary-foreground text-xs py-2">
        <div className="container flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +234 817 571 9638</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> info@drsamueldental.com</span>
            <span className="hidden md:flex items-center gap-1"><MapPin className="w-3 h-3" /> Jos, Nigeria</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="opacity-70">Follow us:</span>
            <a href="#" className="hover:opacity-80">FB</a>
            <a href="#" className="hover:opacity-80">IG</a>
            <a href="#" className="hover:opacity-80">TW</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full dental-gradient flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.5 2 7.5 3 7 5C6.5 7 5 8 4 10C3 12 3 14 4 16C5 18 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 19 18 20 16C21 14 21 12 20 10C19 8 17.5 7 17 5C16.5 3 14.5 2 12 2Z" fill="white"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-foreground">Dr Samuel's</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
            <Link to="/admin" className="text-muted-foreground hover:text-primary transition-colors" title="Admin Dashboard">
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => {
                if (isHome) {
                  document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Book Now
            </Button>
            <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-2">
            {navLinks.map(link => (
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link to="/contact" className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
            <Link to="/admin" className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
            <Button size="sm" className="w-full mt-2" onClick={() => {
              setMobileOpen(false);
              if (isHome) document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Book Now
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
