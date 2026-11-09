
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { getImageUrl } from "../services/api";
import { useNavigate } from "react-router-dom";

import {
  LoaderCircle,
  AlertCircle,
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

import "./Catalogue.css";

// Fallback image when a product image is unavailable
const FALLBACK_IMAGE =
  "https://placehold.co/600x600?text=Gift";

const OCCASIONS = [
  "Corporate Diwali Gifting",
  "Employee Onboarding",
  "Events and Trade Shows",
  "Employee Recognition",
  "New Year Gifts",
  "Client and Vendor Gifting",
];

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const [minBudget, setMinBudget] = useState("");
  const [maxBudget, setMaxBudget] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const filters = {
          ...(category && { category }),
          ...(occasion && { occasion }),
          ...(minBudget !== "" && { minBudget }),
          ...(maxBudget !== "" && { maxBudget }),
        };

        const response = await getProducts(filters);

        const productList = Array.isArray(response)
          ? response
          : response.data || response.products || [];

        // Hide duplicate product names without deleting database records
        const uniqueProducts = Array.from(
          new Map(
            productList.map((product) => [
              String(product.name || "").toLowerCase().trim(),
              product,
            ])
          ).values()
        );

        setProducts(uniqueProducts);
      } catch (err) {
        console.error("Catalogue error:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, occasion, minBudget, maxBudget]);

  const resetFilters = () => {
    setCategory("");
    setOccasion("");
    setMinBudget("");
    setMaxBudget("");
  };

  return (
    <main className="catalogue-page">

      {/* Catalogue Hero */}
      <section className="catalogue-hero">
        <div className="catalogue-hero-content">
          <span className="eyebrow">
            THOUGHTFULLY CURATED COLLECTION
          </span>

          <h1>
            Gifts that make
            <br />
            <span>every connection special.</span>
          </h1>

          <p>
            Explore thoughtfully selected corporate gifts,
            employee welcome kits and premium hampers
            designed to leave a lasting impression.
          </p>

          <a href="#gift-collection" className="catalogue-hero-link">
            Discover our collection
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      {/* Catalogue Filters */}
      <section className="catalogue-main" id="gift-collection">

        <div className="catalogue-section-heading">
          <div>
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>Explore Gifts</h2>
            <p>Find the perfect gift for every occasion.</p>
          </div>

          <span className="catalogue-count">
            {products.length} Products
          </span>
        </div>

        <section className="catalogue-filters">

          <div className="filter-title">
            <SlidersHorizontal size={19} />
            <h3>Refine your selection</h3>
          </div>

          <div className="filter-controls">

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>

              {[
                ...new Set(
                  products.map((p) => p.category).filter(Boolean)
                ),
              ].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option value="">All Occasions</option>

              {OCCASIONS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Min Budget ₹"
              min="0"
              value={minBudget}
              onChange={(e) => setMinBudget(e.target.value)}
            />

            <input
              type="number"
              placeholder="Max Budget ₹"
              min="0"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
            />

            <button
              onClick={resetFilters}
              className="reset-filter"
              type="button"
            >
              <RotateCcw size={15} />
              Reset
            </button>

          </div>
        </section>

        {/* Product Collection */}
        {loading ? (
          <div className="catalogue-message">
            <LoaderCircle className="loading-icon" size={34} />
            <p>Finding the perfect gifts...</p>
          </div>
        ) : error ? (
          <div className="catalogue-message">
            <AlertCircle size={30} />
            <p>{error}</p>

            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="catalogue-message">
            <p>No products match your filters.</p>

            <button onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <section className="product-grid">

            {products.map((product) => (
              <article className="product-card" key={product.id}>

                <div className="product-image-placeholder">

                  <img
                    src={
                      getImageUrl(product.image_url) || FALLBACK_IMAGE
                    }
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />

                  <span className="product-image-label">
                    TRIBE GREEN
                  </span>

                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category || "Corporate Gifting"}
                  </span>

                  <h2>{product.name}</h2>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-card-bottom">

                    <div className="product-price">
                      <span>Starting from</span>

                      <strong>
                        ₹
                        {Number(
                          product.min_price || 0
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <button
                      className="product-button"
                      onClick={() =>
                        navigate(`/products/${product.id}`)
                      }
                    >
                      Explore Gift
                      <ArrowRight size={16} />
                    </button>

                  </div>
                </div>

              </article>
            ))}

          </section>
        )}

      </section>
    </main>
  );
}
