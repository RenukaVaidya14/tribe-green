
import { Leaf, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">

        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <Leaf size={25} />
              <span>TRIBE GREEN</span>
            </div>

            <p>
              Thoughtful corporate gifting that builds
              meaningful connections and lasting impressions.
            </p>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/catalogue">Our Catalogue</Link>
            <a href="/#about">About Us</a>
          </div>

          <div className="footer-column">
            <h4>Get in touch</h4>
            <a href="mailto:hello@tribegreen.com">
              Email Us <ArrowUpRight size={14} />
            </a>
            <Link to="/catalogue">Request a Quote</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Tribe Green. All rights reserved.</span>
          <span>Thoughtfully curated. Meaningfully gifted.</span>
        </div>

      </div>
    </footer>
  );
}
