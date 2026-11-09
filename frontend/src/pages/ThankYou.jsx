
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import "./ThankYou.css";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();

  const enquiry = location.state?.enquiry;
  const enquiryId = location.state?.enquiryId;

  // Replace with the actual business WhatsApp number.
  const phoneNumber = "919876543210";

  const message = `Hello Tribe Green!

I have submitted a corporate gifting enquiry.

Enquiry Reference: ${enquiryId ? `#${enquiryId}` : "Not available"}
Name: ${enquiry?.name || ""}
Company: ${enquiry?.company || ""}
Phone: ${enquiry?.phone || ""}
Quantity: ${enquiry?.quantity || ""}
Budget per gift: ₹${enquiry?.budget || ""}
Occasion: ${enquiry?.occasion || ""}

Please contact me regarding my requirements.`;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <main className="thankyou-page">
      <div className="thankyou-card">
        <div className="success-icon">
          <CheckCircle size={45} />
        </div>

        <span className="eyebrow">ENQUIRY RECEIVED</span>

        <h1>Thank You!</h1>

        <p className="thankyou-description">
          Your gifting enquiry has been successfully submitted.
          Our team will review your requirements and contact you soon.
        </p>

        {enquiryId && (
          <div className="enquiry-reference">
            <span>Enquiry Reference</span>
            <strong>#{enquiryId}</strong>
          </div>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
        >
          <MessageCircle size={19} />
          Continue on WhatsApp
        </a>

        <button
          className="back-catalogue-button"
          onClick={() => navigate("/catalogue")}
        >
          Explore More Gifts <ArrowRight size={17} />
        </button>
      </div>
    </main>
  );
}
