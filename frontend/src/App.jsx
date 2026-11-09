
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catalogue from "./pages/Catalogue";
import ProductDetails from "./pages/ProductDetails";
import Enquiry from "./pages/Enquiry";
import ThankYou from "./pages/ThankYou";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import EnquiryDetails from "./Admin/EnquiryDetails";
import ProtectedRoute from "./Admin/ProtectedRoute";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Website */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/enquiry" element={<Enquiry />} />
        <Route path="/thank-you" element={<ThankYou />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/enquiries/:id"
            element={<EnquiryDetails />}
          />
        </Route>
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
