
import { Link } from "react-router-dom";
import {
  Leaf,
  Heart,
  Target,
  Eye,
  Gift,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import "./About.css";

const values = [
  {
    icon: Heart,
    title: "Thoughtful Selection",
    description:
      "We carefully select meaningful products that make every corporate gift memorable.",
  },
  {
    icon: Leaf,
    title: "Quality & Sustainability",
    description:
      "We focus on quality products and thoughtful choices that create lasting value.",
  },
  {
    icon: Gift,
    title: "Personalised Gifting",
    description:
      "From branded merchandise to customised gift boxes, we make gifting personal.",
  },
];

const benefits = [
  "Curated corporate gifting collections",
  "Personalised branding and customisation",
  "Solutions for employees and clients",
  "Thoughtful packaging and presentation",
  "Support for bulk corporate orders",
];

export default function About() {
  const { theme } = useTheme();

  return (
    <main className={`about-page theme-${theme}`}>
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-eyebrow">OUR STORY</span>

          <h1>
            Making Every
            <br />
            Connection <span>Meaningful.</span>
          </h1>

          <p>
            At Tribe Green, we believe corporate gifting is more than
            exchanging presents. It is about building relationships,
            expressing appreciation and creating meaningful connections.
          </p>

          <Link to="/catalogue" className="about-primary-btn">
            Explore Our Collection <ArrowRight size={18} />
          </Link>
        </div>

        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=90"
            alt="Beautifully arranged gift boxes"
          />
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-intro section-container">
        <div className="about-intro-image">
          <img
            src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=1000&q=85"
            alt="Thoughtfully arranged gifts"
          />
        </div>

        <div className="about-intro-content">
          <span className="about-eyebrow">WHO WE ARE</span>

          <h2>Gifting That Goes Beyond the Ordinary</h2>

          <p>
            Tribe Green brings together thoughtfully selected products
            and personalised gifting solutions for businesses.
          </p>

          <p>
            Whether you are welcoming new employees, appreciating
            valuable clients or celebrating important milestones, we
            help make every gifting experience special.
          </p>

          <p>
            Our approach combines thoughtful selection, quality,
            personalisation and elegant presentation.
          </p>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="about-purpose">
        <div className="section-container purpose-grid">
          <div className="purpose-card">
            <div className="purpose-icon">
              <Target size={28} />
            </div>

            <span className="about-eyebrow">OUR MISSION</span>

            <h2>Make Every Gift Meaningful</h2>

            <p>
              To help businesses express appreciation and strengthen
              relationships through thoughtful, personalised corporate
              gifting experiences.
            </p>
          </div>

          <div className="purpose-card">
            <div className="purpose-icon">
              <Eye size={28} />
            </div>

            <span className="about-eyebrow">OUR VISION</span>

            <h2>Build Lasting Connections</h2>

            <p>
              To make corporate gifting a more thoughtful experience
              where every product communicates care, recognition and
              connection.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="about-values section-container">
        <div className="about-section-heading">
          <span className="about-eyebrow">WHAT MATTERS TO US</span>
          <h2>Our Values</h2>
          <p>
            The principles that shape every gifting experience we create.
          </p>
        </div>

        <div className="about-values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article className="about-value-card" key={value.title}>
                <div className="value-icon">
                  <Icon size={27} />
                </div>

                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-why">
        <div className="section-container about-why-grid">
          <div>
            <span className="about-eyebrow">WHY TRIBE GREEN</span>

            <h2>
              Thoughtful Details.
              <br />
              Meaningful Experiences.
            </h2>

            <p>
              We make corporate gifting easier with carefully curated
              collections and customisation options for your business.
            </p>

            <Link to="/catalogue" className="about-primary-btn">
              Discover Our Gifts <ArrowRight size={18} />
            </Link>
          </div>

          <div className="about-benefits">
            {benefits.map((benefit) => (
              <div className="about-benefit" key={benefit}>
                <CheckCircle2 size={21} />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="about-cta section-container">
        <span className="about-eyebrow">LET'S CREATE SOMETHING MEANINGFUL</span>

        <h2>Make Your Next Gift Count.</h2>

        <p>
          Explore thoughtful gifting solutions for your organisation.
        </p>

        <Link to="/contact" className="about-primary-btn">
          Get in Touch <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
