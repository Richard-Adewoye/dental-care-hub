import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShieldCheck, Search } from "lucide-react";
import InstallButton from "@/components/InstallButton";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Why Choose Us", href: "#why-choose-us" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (e: React.MouseEvent, href: string) => {
    if (!isHome) return;
    e.preventDefault();
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header className="w-full fixed top-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-primary/90 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full dental-gradient flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.5 2 7.5 3 7 5C6.5 7 5 8 4 10C3 12 3 14 4 16C5 18 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 19 18 20 16C21 14 21 12 20 10C19 8 17.5 7 17 5C16.5 3 14.5 2 12 2Z" fill="white"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-primary-foreground">Exceptional Dental Care</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors drop-shadow-sm"
                >
                  {link.label}
                </Link>
              ) : isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors drop-shadow-sm"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="text-sm font-medium text-primary-foreground/90 hover:text-primary-foreground transition-colors drop-shadow-sm"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors" title="Admin">
              <ShieldCheck className="w-4 h-4" />
            </Link>
            <button className="w-9 h-9 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground transition-all">
              <Search className="w-4 h-4" />
            </button>
            <InstallButton />
            <Link
              to="/contact"
              className="px-5 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-sm font-semibold text-primary-foreground uppercase tracking-wider hover:bg-primary-foreground/20 transition-all"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-primary/95 backdrop-blur-lg border-t border-primary-foreground/10 px-4 pb-4 space-y-1">
            {navLinks.map(link => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ) : isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="block py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link to="/contact" className="block py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground" onClick={() => setMobileOpen(false)}>
              Contact Us
            </Link>
            <Link to="/admin" className="flex items-center gap-2 py-2.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground" onClick={() => setMobileOpen(false)}>
              <ShieldCheck className="w-4 h-4" /> Admin
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
