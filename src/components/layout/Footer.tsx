import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-dental-dark text-primary-foreground">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C9.5 2 7.5 3 7 5C6.5 7 5 8 4 10C3 12 3 14 4 16C5 18 6 22 8 22C9.5 22 10 20 12 20C14 20 14.5 22 16 22C18 22 19 18 20 16C21 14 21 12 20 10C19 8 17.5 7 17 5C16.5 3 14.5 2 12 2Z" fill="white"/>
              </svg>
            </div>
            <span className="text-lg font-bold">Dr Samuel's</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Providing quality dental care with 15+ years of expertise. Your smile is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li><a href="#home" className="hover:opacity-100 transition-opacity">Home</a></li>
            <li><a href="#services" className="hover:opacity-100 transition-opacity">Services</a></li>
            <li><a href="#about" className="hover:opacity-100 transition-opacity">About Us</a></li>
            <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-3 text-sm opacity-70">
             <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +234 810 815 5239</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@drsamueldental.com</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Jos, Nigeria</li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="font-semibold mb-4">Working Hours</h3>
          <ul className="space-y-2 text-sm opacity-70">
            <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Mon - Fri: 8AM - 6PM</li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Saturday: 9AM - 4PM</li>
            <li className="flex items-center gap-2"><Clock className="w-4 h-4" /> Sunday: Closed</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-50">
        <p>&copy; {new Date().getFullYear()} Dr Samuel's Dental Clinic. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:opacity-100">Privacy Policy</a>
          <a href="#" className="hover:opacity-100">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
