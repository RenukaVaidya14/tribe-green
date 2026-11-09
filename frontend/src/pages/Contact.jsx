
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./Contact.css";

// Replace these with your official business contact details.
const CONTACT_EMAIL = "YOUR_EMAIL@example.com";
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

export default function Contact() {
  const { theme } = useTheme();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Website Contact Enquiry - ${form.name}`
    );

    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Company: ${form.company}\n` +
      `Phone: ${form.phone}\n\n` +
      `Message:\n${form.message}`
    );

    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <main className={`contact-page theme-${theme}`}>
      {/* Hero */}
      <section className="contact-hero">
        <span className="contact-eyebrow">GET IN TOUCH</span>

        <h1>
          Let's Create
          <br />
          Something <span>Meaningful.</span>
        </h1>

        <p>
          Have a corporate gifting requirement or a custom idea?
          We'd love to hear from you.
        </p>
      </section>

      {/* Contact Content */}
      <section className="contact-container">
        <div className="contact-info">
          <span className="contact-eyebrow">CONTACT TRIBE GREEN</span>

          <h2>We'd Love to Hear From You</h2>

          <p>
            Tell us what you're looking for. Our team can help you
            explore gifting collections and customisation options.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-icon">
                <Mail size={22} />
              </div>

              <div>
                <h3>Email Us</h3>
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <Phone size={22} />
              </div>

              <div>
                <h3>Call Us</h3>
                <p>Update with your official phone number</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <MapPin size={22} />
              </div>

              <div>
                <h3>Our Location</h3>
                <p>Update with your business address</p>
              </div>
            </div>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="contact-whatsapp"
          >
            <MessageCircle size={19} />
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>

          <p>Share your requirements with us.</p>

          <form onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email Address *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div className="contact-form-row">
              <div className="contact-field">
                <label htmlFor="contact-company">Company Name</label>
                <input
                  id="contact-company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Your company"
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">Phone Number</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your Message *</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your gifting requirements..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="contact-submit-btn">
              Send Message <Send size={17} />
            </button>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="contact-bottom">
        <h2>Thoughtful Gifting Starts Here.</h2>
        <p>Let's make your next corporate gifting experience special.</p>
      </section>
    </main>
  );
}
