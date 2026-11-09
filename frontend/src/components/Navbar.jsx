
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X, Leaf } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="brand-icon">
            <Leaf size={23} />
          </span>

          <span>
            <strong>TRIBE GREEN</strong>
            <small>THOUGHTFUL GIFTING</small>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/catalogue" onClick={closeMenu}>
            Catalogue
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About Us
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
          </button>

          <Link
            to="/catalogue"
            className={`nav-cta nav-cta-${theme}`}
            onClick={closeMenu}
          >
            Explore Gifts
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

        </div>
      </div>
    </header>
  );
}
