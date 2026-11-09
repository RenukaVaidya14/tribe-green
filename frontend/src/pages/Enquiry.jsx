
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Send, LoaderCircle } from "lucide-react";
import api from "../services/api";
import "./Enquiry.css";

const initialForm = {
  name: "",
  company: "",
  phone: "",
  email: "",
  occasion: "",
  quantity: "",
  budget: "",
  delivery_date: "",
  customisations: [],
  message: "",
};

const customisationOptions = [
  "Logo printing",
  "Laser engraving",
  "Name personalisation",
  "Custom packaging",
];

export default function Enquiry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCustomisation = (option) => {
    setForm((previous) => ({
      ...previous,
      customisations: previous.customisations.includes(option)
        ? previous.customisations.filter((item) => item !== option)
        : [...previous.customisations, option],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        quantity: Number(form.quantity),
        budget: Number(form.budget),
        product_ids: productId ? [Number(productId)] : [],
        source: "Website",
      };

      const response = await api.post("/enquiries", payload);

      if (response.data.success === false) {
        throw new Error(response.data.message || "Enquiry submission failed.");
      }

      navigate("/thank-you", {
        state: {
          enquiry: form,
          enquiryId: response.data.data?.id || response.data.id,
        },
      });
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Unable to submit your enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="enquiry-page">
      <button
        className="back-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={17} /> Back
      </button>

      <section className="enquiry-heading">
        <span className="eyebrow">LET'S CREATE SOMETHING MEANINGFUL</span>
        <h1>Tell Us About Your Gifting Needs</h1>
        <p>
          Share a few details and our team will help you find
          the perfect corporate gifts.
        </p>
      </section>

      <form className="enquiry-form" onSubmit={handleSubmit}>
        <h2>Your Details</h2>

        <div className="form-grid">
          <label>
            Full Name *
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Enter your name"
              required
            />
          </label>

          <label>
            Company Name *
            <input
              name="company"
              value={form.company}
              onChange={updateField}
              placeholder="Enter company name"
              required
            />
          </label>

          <label>
            Phone Number *
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />
          </label>

          <label>
            Email Address *
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Occasion *
            <select
              name="occasion"
              value={form.occasion}
              onChange={updateField}
              required
            >
              <option value="">Select occasion</option>
              <option>Corporate Diwali Gifting</option>
              <option>Employee Onboarding</option>
              <option>Employee Recognition</option>
              <option>Client and Vendor Gifting</option>
              <option>Events and Trade Shows</option>
              <option>New Year Gifts</option>
            </select>
          </label>

          <label>
            Quantity *
            <input
              name="quantity"
              type="number"
              min="1"
              value={form.quantity}
              onChange={updateField}
              placeholder="Number of gifts"
              required
            />
          </label>

          <label>
            Budget per Gift (₹) *
            <input
              name="budget"
              type="number"
              min="1"
              value={form.budget}
              onChange={updateField}
              placeholder="Enter budget per gift"
              required
            />
          </label>

          <label>
            Expected Delivery Date *
            <input
              name="delivery_date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={form.delivery_date}
              onChange={updateField}
              required
            />
          </label>
        </div>

        <div className="form-section">
          <h2>Customisation Requirements</h2>

          <div className="customisation-options">
            {customisationOptions.map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={form.customisations.includes(option)}
                  onChange={() => handleCustomisation(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <label>
            Additional Requirements
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={updateField}
              placeholder="Tell us about your gifting requirements..."
            />
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button
          type="submit"
          className="submit-enquiry-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle className="loading-icon" size={18} />
              Submitting...
            </>
          ) : (
            <>
              Submit Enquiry <Send size={17} />
            </>
          )}
        </button>

        <p className="form-note">
          Our team will review your requirements and get in touch with you.
        </p>
      </form>
    </main>
  );
}
