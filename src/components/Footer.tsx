import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-cinema-darker border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-primary to-accent p-2 rounded-lg">
                <Film className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CinemaHub
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your premier destination for movie tickets. Book now and experience cinema like never before.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/movies" className="hover:text-primary transition-colors">Movies</Link></li>
              <li><Link to="/bookings" className="hover:text-primary transition-colors">My Bookings</Link></li>
              <li><Link to="/chat" className="hover:text-primary transition-colors">Support Chat</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Locations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Dharan</li>
              <li>Itahari</li>
              <li>Biratnagar</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              support@cinemahub.com
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 CinemaHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
