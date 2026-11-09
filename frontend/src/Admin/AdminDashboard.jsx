
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  RefreshCw,
  Download,
  LogOut,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import "./AdminDashboard.css";

const STATUSES = ["New", "Contacted", "Converted", "Lost"];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch enquiries from backend
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError("");

      const token = sessionStorage.getItem("tribe_admin_token");

      const response = await api.get("/admin/enquiries", {
        params: {
          ...(statusFilter && { status: statusFilter }),
          ...(sourceFilter && { source: sourceFilter }),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      const list = Array.isArray(data)
        ? data
        : data.data || data.enquiries || [];

      setEnquiries(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch enquiries error:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        sessionStorage.removeItem("tribe_admin_token");
        navigate("/admin/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message || "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter, sourceFilter]);

  // Update enquiry status
  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      const token = sessionStorage.getItem("tribe_admin_token");

      await api.patch(
        `/admin/enquiries/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchEnquiries();
    } catch (err) {
      console.error("Update status error:", err);
      alert(err.response?.data?.message || "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Logout admin
  const handleLogout = () => {
    sessionStorage.removeItem("tribe_admin_token");
    navigate("/admin/login", { replace: true });
  };

  // Export enquiries as CSV
  const exportCSV = async () => {
    try {
      const token = sessionStorage.getItem("tribe_admin_token");

      const response = await api.get("/admin/enquiries/export/csv", {
        params: {
          ...(statusFilter && { status: statusFilter }),
          ...(sourceFilter && { source: sourceFilter }),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "text/csv" })
      );

      const link = document.createElement("a");
      link.href = url;
      link.download = "tribe-green-enquiries.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV export error:", err);
      alert("Unable to export enquiries.");
    }
  };

  // Search enquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const query = search.toLowerCase();

    return (
      String(item.name || "").toLowerCase().includes(query) ||
      String(item.company || "").toLowerCase().includes(query) ||
      String(item.email || "").toLowerCase().includes(query) ||
      String(item.phone || "").includes(query)
    );
  });

  // Count enquiries by status
  const getCount = (status) =>
    enquiries.filter((item) => item.status === status).length;

  return (
    <main className="admin-dashboard">
      {/* Top navigation */}
      <header className="admin-topbar">
        <div className="admin-brand">
          <LayoutDashboard size={23} />
          <span>
            TRIBE GREEN <small>ADMIN</small>
          </span>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          <LogOut size={17} />
          Logout
        </button>
      </header>

      <section className="admin-content">
        {/* Dashboard heading */}
        <div className="admin-heading">
          <div>
            <span className="eyebrow">MANAGEMENT OVERVIEW</span>
            <h1>Dashboard</h1>
            <p>Manage your corporate gifting enquiries.</p>
          </div>

          <button
            className="admin-refresh"
            onClick={fetchEnquiries}
            disabled={loading}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <section className="admin-stats">
          <div className="stat-card">
            <span>Total Enquiries</span>
            <strong>{enquiries.length}</strong>
          </div>

          <div className="stat-card">
            <span>New</span>
            <strong>{getCount("New")}</strong>
          </div>

          <div className="stat-card">
            <span>Contacted</span>
            <strong>{getCount("Contacted")}</strong>
          </div>

          <div className="stat-card">
            <span>Converted</span>
            <strong>{getCount("Converted")}</strong>
          </div>

          <div className="stat-card">
            <span>Lost</span>
            <strong>{getCount("Lost")}</strong>
          </div>
        </section>

        {/* Enquiry table section */}
        <section className="admin-table-section">
          <div className="admin-table-heading">
            <div>
              <h2>Customer Enquiries</h2>
              <p>View and manage incoming enquiries.</p>
            </div>

            <button className="admin-export" onClick={exportCSV}>
              <Download size={17} />
              Export CSV
            </button>
          </div>

          {/* Filters */}
          <div className="admin-filters">
            <div className="admin-search">
              <Search size={17} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, company, email..."
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>

              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Android App">Android App</option>
            </select>
          </div>

          {error && <p className="admin-error">{error}</p>}

          {loading ? (
            <div className="admin-empty">Loading enquiries...</div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="admin-empty">No enquiries found.</div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Phone</th>
                    <th>Quantity</th>
                    <th>Budget</th>
                    <th>Source</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnquiries.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>

                      <td>
                        <strong>{item.name}</strong>
                        <small>{item.email}</small>
                      </td>

                      <td>{item.company || "-"}</td>
                      <td>{item.phone || "-"}</td>
                      <td>{item.quantity || "-"}</td>

                      <td>
                        ₹{Number(item.budget || 0).toLocaleString("en-IN")}
                      </td>

                      <td>
                        <span
                          className={`source-badge ${
                            item.source === "Android App"
                              ? "android-source"
                              : "website-source"
                          }`}
                        >
                          {item.source}
                        </span>
                      </td>

                      <td>
                        <select
                          className={`status-select status-${String(
                            item.status
                          ).toLowerCase()}`}
                          value={item.status}
                          disabled={updatingId === item.id}
                          onChange={(e) =>
                            updateStatus(item.id, e.target.value)
                          }
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* View Details button */}
                      <td>
                        <button
                          className="admin-view-button"
                          onClick={() =>
                            navigate(`/admin/enquiries/${item.id}`)
                          }
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
