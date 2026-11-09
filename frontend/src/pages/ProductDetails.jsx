
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { getImageUrl } from "../services/api";

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import "./ProductDetails.css";

const FALLBACK_IMAGE =
  "https://placehold.co/600x600?text=Gift";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data.data || data.product || data);
      } catch (err) {
        console.error("Product details error:", err);
        setError("Unable to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="catalogue-message">
        <LoaderCircle className="loading-icon" size={32} />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="catalogue-message">
        <p>{error || "Product not found."}</p>

        <button onClick={() => navigate("/catalogue")}>
          Back to Catalogue
        </button>
      </div>
    );
  }

  const occasions = Array.isArray(product.occasions)
    ? product.occasions
    : [];

  const customisations = Array.isArray(product.customisations)
    ? product.customisations
    : [];

  return (
    <main className="product-details-page">

      <button
        className="back-button"
        onClick={() => navigate("/catalogue")}
      >
        <ArrowLeft size={17} />
        Back to Catalogue
      </button>

      <section className="product-details-layout">

        {/* Product Image */}
        <div className="product-details-image">

          <img
            src={getImageUrl(product.image_url) || FALLBACK_IMAGE}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
          />

        </div>

        {/* Product Information */}
        <div className="product-details-content">

          <span className="eyebrow">
            {product.category || "CORPORATE GIFTING"}
          </span>

          <h1>{product.name}</h1>

          <p className="details-description">
            {product.description ||
              "Thoughtfully curated for meaningful gifting."}
          </p>

          <div className="details-price">
            <span>Price Range</span>

            <h2>
              ₹
              {Number(
                product.min_price || 0
              ).toLocaleString("en-IN")}

              {product.max_price &&
                ` – ₹${Number(
                  product.max_price
                ).toLocaleString("en-IN")}`}
            </h2>
          </div>

          {/* Suitable Occasions */}
          {occasions.length > 0 && (
            <div className="details-section">

              <h3>Suitable Occasions</h3>

              <div className="details-tags">

                {occasions.map((item, index) => (
                  <span key={item.id || index}>
                    {typeof item === "string"
                      ? item
                      : item.name}
                  </span>
                ))}

              </div>
            </div>
          )}

          {/* Customisation Options */}
          {customisations.length > 0 && (
            <div className="details-section">

              <h3>Customisation Options</h3>

              <ul>
                {customisations.map((item, index) => (
                  <li key={item.id || index}>
                    {typeof item === "string"
                      ? item
                      : item.name}
                  </li>
                ))}
              </ul>

            </div>
          )}

          <button
            className="details-enquiry-button"
            onClick={() =>
              navigate(`/enquiry?productId=${product.id}`)
            }
          >
            Enquire About This Gift
            <ArrowRight size={18} />
          </button>

        </div>
      </section>
    </main>
  );
}
