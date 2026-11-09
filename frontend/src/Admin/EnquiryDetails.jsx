
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import api from "../services/api";
import "./EnquiryDetails.css";

export default function EnquiryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = sessionStorage.getItem("tribe_admin_token");

        const response = await api.get(`/admin/enquiries/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setEnquiry(data.data || data.enquiry || data);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401 || err.response?.status === 403) {
          sessionStorage.removeItem("tribe_admin_token");
          navigate("/admin/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.message || "Unable to load enquiry details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="admin-detail-message">
        <LoaderCircle className="loading-icon" size={30} />
        Loading enquiry details...
      </div>
    );
  }

  if (error || !enquiry) {
    return (
      <div className="admin-detail-message">
        <p>{error || "Enquiry not found."}</p>
        <button onClick={() => navigate("/admin/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const customisations =
    typeof enquiry.customisations === "string"
      ? (() => {
          try {
            return JSON.parse(enquiry.customisations);
          } catch {
            return [enquiry.customisations];
          }
        })()
      : enquiry.customisations || [];

  const products = enquiry.products || enquiry.selected_products || [];

  return (
    <main className="enquiry-detail-page">
      <button
        className="back-button"
        onClick={() => navigate("/admin/dashboard")}
      >
        <ArrowLeft size={17} /> Back to Dashboard
      </button>

      <div className="enquiry-detail-heading">
        <div>
          <span className="eyebrow">CUSTOMER ENQUIRY</span>
          <h1>Enquiry #{enquiry.id || id}</h1>
        </div>

        <span className="detail-status">
          {enquiry.status || "New"}
        </span>
      </div>

      <section className="detail-card">
        <h2>Customer Information</h2>

        <div className="detail-grid">
          <div><span>Full Name</span><strong>{enquiry.name}</strong></div>
          <div><span>Company</span><strong>{enquiry.company}</strong></div>
          <div><span>Phone</span><strong>{enquiry.phone}</strong></div>
          <div><span>Email</span><strong>{enquiry.email}</strong></div>
          <div><span>Source</span><strong>{enquiry.source}</strong></div>
          <div><span>Occasion</span><strong>{enquiry.occasion}</strong></div>
        </div>
      </section>

      <section className="detail-card">
        <h2>Gifting Requirements</h2>

        <div className="detail-grid">
          <div>
            <span>Quantity</span>
            <strong>{enquiry.quantity}</strong>
          </div>

          <div>
            <span>Budget per Gift</span>
            <strong>
              ₹{Number(enquiry.budget || 0).toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Expected Delivery</span>
            <strong>
              {enquiry.delivery_date
                ? new Date(enquiry.delivery_date).toLocaleDateString("en-IN")
                : "Not specified"}
            </strong>
          </div>
        </div>

        <div className="detail-full-width">
          <span>Customisations</span>
          <div className="detail-tags">
            {customisations.length > 0
              ? customisations.map((item, index) => (
                  <span key={index}>
                    {typeof item === "string" ? item : item.name}
                  </span>
                ))
              : "No customisations specified"}
          </div>
        </div>

        <div className="detail-full-width">
          <span>Additional Message</span>
          <p>{enquiry.message || "No additional message."}</p>
        </div>
      </section>

      <section className="detail-card">
        <h2>Selected Products</h2>

        {products.length > 0 ? (
          products.map((product, index) => (
            <div className="selected-product" key={product.id || index}>
              {product.name || product.product_name || `Product #${product.id || ""}`}
            </div>
          ))
        ) : (
          <p>No product details available.</p>
        )}
      </section>
    </main>
  );
}
