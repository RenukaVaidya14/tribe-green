
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Gift,
  PackageCheck,
  Palette,
  Truck,
  Sparkles,
} from "lucide-react";
import "./Home.css";

const categories = [
  {
    title: "Drinkware",
    description: "Thoughtful everyday essentials.",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=900&q=85",
  },
  {
    title: "Apparel & Accessories",
    description: "Branded merchandise with personality.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
  },
  {
    title: "Office Essentials",
    description: "Make every workday more meaningful.",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=900&q=85",
  },
  {
    title: "Gift Hampers",
    description: "Beautifully curated gifting experiences.",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=900&q=85",
  },
];

const solutions = [
  {
    title: "Employee Onboarding",
    description:
      "Welcome new team members with thoughtfully curated joining kits.",
    image:
      "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=900&q=85",
  },
  {
    title: "Client & Partner Gifting",
    description:
      "Build lasting business relationships with memorable gifts.",
    image:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=900&q=85",
  },
  {
    title: "Events & Celebrations",
    description:
      "Make corporate events and special occasions unforgettable.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=85",
  },
];

const benefits = [
  {
    icon: Gift,
    title: "Thoughtful Selection",
    description:
      "Carefully selected gifting ideas for people and occasions that matter.",
  },
  {
    icon: Palette,
    title: "Personalised Branding",
    description:
      "Make gifts memorable with custom branding and personalisation.",
  },
  {
    icon: PackageCheck,
    title: "Curated Packaging",
    description:
      "Beautiful presentation that makes every gift feel special.",
  },
  {
    icon: Truck,
    title: "Corporate Orders",
    description:
      "Gifting solutions designed for teams, clients and business events.",
  },
];

export default function Home() {
  return (
    <main className="home-page">

      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="eyebrow">
            THOUGHTFUL CORPORATE GIFTING
          </span>

          <h1>
            Make every
            <br />
            <span>connection</span> meaningful.
          </h1>

          <p>
            Discover thoughtfully curated corporate gifts
            that celebrate people, strengthen relationships
            and make every occasion memorable.
          </p>

          <div className="home-hero-actions">
            <Link to="/catalogue" className="home-primary-button">
              Explore Collection
              <ArrowRight size={17} />
            </Link>

            <Link to="/enquiry" className="home-secondary-button">
              Request a Proposal
            </Link>
          </div>

          <div className="home-hero-note">
            <Sparkles size={16} />
            <span>Gifting made personal. Relationships made stronger.</span>
          </div>
        </div>

        <div className="home-hero-image">
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200&q=90"
            alt="Beautifully wrapped premium gift boxes"
          />

          <div className="hero-image-caption">
            <span>THE ART OF GIVING</span>
            <strong>Made to be remembered.</strong>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="home-intro">
        <span className="eyebrow">A LITTLE MORE THOUGHTFUL</span>

        <h2>
          More than a gift.
          <br />
          <span>A meaningful gesture.</span>
        </h2>

        <p>
          At Tribe Green, we believe the right gift can
          communicate appreciation, celebrate achievements
          and bring people closer. We help businesses create
          thoughtful gifting experiences for every milestone.
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="home-categories">
        <div className="home-section-heading">
          <div>
            <span className="eyebrow">EXPLORE OUR WORLD</span>
            <h2>Gifts for every kind of connection.</h2>
          </div>

          <Link to="/catalogue" className="home-text-link">
            View all gifts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              to="/catalogue"
              className="home-category-card"
              key={category.title}
            >
              <div className="home-category-image">
                <img src={category.image} alt={category.title} loading="lazy" />
              </div>

              <div className="home-category-info">
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>

                <ArrowRight size={19} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CORPORATE SOLUTIONS */}
      <section className="home-solutions">
        <div className="home-section-heading">
          <div>
            <span className="eyebrow">MADE FOR BUSINESS</span>
            <h2>Every occasion deserves a thoughtful gift.</h2>
          </div>
        </div>

        <div className="home-solution-grid">
          {solutions.map((solution) => (
            <article className="home-solution-card" key={solution.title}>
              <div className="home-solution-image">
                <img
                  src={solution.image}
                  alt={solution.title}
                  loading="lazy"
                />
              </div>

              <div className="home-solution-info">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>

                <Link to="/enquiry">
                  Enquire now <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY TRIBE GREEN */}
      <section className="home-benefits">
        <div className="home-benefits-heading">
          <span className="eyebrow">THE TRIBE GREEN DIFFERENCE</span>
          <h2>Thought behind every detail.</h2>
          <p>
            We bring together meaningful products,
            personal touches and thoughtful presentation.
          </p>
        </div>

        <div className="home-benefits-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div className="home-benefit-card" key={benefit.title}>
                <div className="home-benefit-icon">
                  <Icon size={23} />
                </div>

                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CUSTOMISATION */}
      <section className="home-customisation">
        <div className="home-customisation-image">
          <img
            src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1100&q=85"
            alt="Gift packaging and personalised gifting"
            loading="lazy"
          />
        </div>

        <div className="home-customisation-content">
          <span className="eyebrow">MAKE IT YOURS</span>

          <h2>
            Your brand.
            <br />
            Your story.
            <br />
            <span>Your thoughtful gift.</span>
          </h2>

          <p>
            Add your brand identity to carefully selected
            gifts with personalised touches, logo printing
            and thoughtful packaging.
          </p>

          <Link to="/enquiry" className="home-primary-button">
            Customise Your Gifts
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="home-cta">
        <span className="eyebrow">LET'S CREATE SOMETHING MEANINGFUL</span>

        <h2>
          Have a gifting idea
          <br />
          in mind?
        </h2>

        <p>
          Tell us about your occasion, team or gifting requirements.
          Let's find something thoughtful together.
        </p>

        <Link to="/enquiry" className="home-primary-button">
          Start Your Enquiry
          <ArrowRight size={17} />
        </Link>
      </section>

    </main>
  );
}
